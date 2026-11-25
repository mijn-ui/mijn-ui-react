#!/usr/bin/env node
/**
 * Static check for the code patterns behind this estate's real security bugs.
 *
 * Every rule below is a place where React's own escaping stops protecting you:
 * HTML rendered as markup, code built from strings, content framed or opened in a
 * new window, cross-window messages, URLs that execute, secrets in web storage.
 * chat-kit shipped three of these unfixed for a month (artifact URLs framed with
 * `allow-same-origin`, previews without a content policy, third-party images
 * loaded on sight) because a copy kept the code after its source was fixed.
 *
 * A hit is not automatically a bug — a code block has to render highlighted HTML,
 * an artifact preview has to frame something. So each one is either fixed or
 * written into `security-sinks.json` with the reason it is safe, and that review
 * is what this check enforces:
 *
 *   - a new hit with no reviewed entry fails;
 *   - a reviewed entry that no longer matches anything fails too, so the list
 *     cannot quietly outlive the code it vouched for.
 *
 * No dependencies on purpose: a security check should not widen the supply chain
 * it is guarding. Configuration (`security-sinks.json`, next to package.json):
 *
 *   {
 *     "roots": ["src"],                       // directories to scan
 *     "allow": [
 *       { "rule": "iframe", "file": "src/x.tsx", "contains": "sandbox=",
 *         "reason": "why this occurrence is safe" }
 *     ]
 *   }
 *
 * Usage: node scripts/check-security-sinks.mjs
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { join, relative, sep } from "node:path"

const ROOT = process.cwd()

const RULES = [
  {
    id: "html-injection",
    re: /dangerouslySetInnerHTML|\.innerHTML\s*=|\.outerHTML\s*=|insertAdjacentHTML\(|document\.write\(/,
    why: "renders a string as markup — any untrusted part of it is XSS",
  },
  {
    id: "code-eval",
    re: /\beval\(|\bnew Function\(|\bset(?:Timeout|Interval)\(\s*["'`]/,
    why: "runs a string as code",
  },
  {
    id: "iframe",
    re: /<iframe\b|\.srcdoc\s*=|\bsrcDoc=|\bsandbox=/,
    why: "frames content — check the sandbox flags and that the src is validated (allow-scripts + allow-same-origin on a same-origin URL escapes the sandbox)",
  },
  {
    id: "window-open",
    re: /\bwindow\.open\(/,
    why: "React's href sanitising never reaches window.open — validate the URL is http(s) and pass noopener",
  },
  {
    id: "message-listener",
    re: /addEventListener\(\s*["'`]message["'`]/,
    why: "receives cross-window messages — check event.origin and event.source before trusting the data",
  },
  {
    id: "post-message-any-origin",
    re: /postMessage\([^;]*,\s*["'`]\*["'`]/,
    why: "posts to whatever origin the target window has — name the expected origin",
  },
  {
    id: "javascript-url",
    re: /["'`]\s*javascript:/i,
    why: "a javascript: URL executes on click",
  },
  {
    id: "secret-in-web-storage",
    re: /(?:localStorage|sessionStorage)\.setItem\(\s*[^,]*(?:token|secret|password|jwt|credential)|document\.cookie\s*=/i,
    why: "web storage and script-set cookies are readable by any XSS on the origin — keep tokens in httpOnly cookies or memory",
  },
  {
    id: "target-blank-without-rel",
    tag: true,
    re: /target=\{?\s*["'`]_blank["'`]\s*\}?/,
    why: 'target=_blank without rel="noopener" (or noreferrer) hands the new page a handle on this one in older browsers',
  },
]

const SKIP_DIRS = new Set([
  "node_modules",
  "dist",
  "build",
  "coverage",
  ".turbo",
  "storybook-static",
])
const SOURCE = /\.(?:[cm]?[jt]sx?)$/
const NOT_SHIPPED =
  /\.(?:test|spec|stories)\.[cm]?[jt]sx?$|(?:^|[\\/])__tests?__(?:[\\/]|$)/

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walk(path, out)
    else if (SOURCE.test(name) && !NOT_SHIPPED.test(path)) out.push(path)
  }
  return out
}

// A whole-line comment: a line comment, a block comment's opening or body line,
// or a JSX comment (an opening brace followed by a block comment).
const isCommentLine = (line) => /^\s*(?:\/\/|\/\*|\*|\{\s*\/\*)/.test(line)

/** The JSX opening tag around `index`, skipping `=>` so arrow functions don't end it. */
function tagAround(text, index) {
  const start = text.lastIndexOf("<", index)
  let end = index
  while (end < text.length) {
    const close = text.indexOf(">", end)
    if (close === -1) return text.slice(start)
    if (text[close - 1] !== "=") return text.slice(start, close + 1)
    end = close + 1
  }
  return text.slice(start)
}

const configPath = join(ROOT, "security-sinks.json")
if (!existsSync(configPath)) {
  console.error("✗ security-sinks.json not found next to package.json")
  process.exit(1)
}
const config = JSON.parse(readFileSync(configPath, "utf8"))
const roots = config.roots ?? ["src"]
const allow = (config.allow ?? []).map((entry) => ({ ...entry, used: false }))

for (const entry of allow) {
  if (!entry.rule || !entry.file || !entry.contains || !entry.reason?.trim()) {
    console.error(
      `✗ security-sinks.json: every entry needs rule, file, contains and a reason — ${JSON.stringify(entry)}`,
    )
    process.exit(1)
  }
}

const files = roots.flatMap((root) =>
  existsSync(join(ROOT, root)) ? walk(join(ROOT, root)) : [],
)
const hits = []

for (const path of files) {
  const file = relative(ROOT, path).split(sep).join("/")
  const text = readFileSync(path, "utf8")
  const lines = text.split("\n")
  let offset = 0
  lines.forEach((line, i) => {
    if (!isCommentLine(line)) {
      for (const rule of RULES) {
        const m = rule.re.exec(line)
        if (!m) continue
        if (rule.tag) {
          const tag = tagAround(text, offset + m.index)
          if (/\brel=\{?\s*["'`][^"'`]*\b(?:noopener|noreferrer)\b/.test(tag))
            continue
        }
        hits.push({ rule, file, line: i + 1, text: line.trim() })
      }
    }
    offset += line.length + 1
  })
}

const unreviewed = hits.filter((hit) => {
  const entry = allow.find(
    (a) =>
      a.rule === hit.rule.id &&
      a.file === hit.file &&
      hit.text.includes(a.contains),
  )
  if (entry) entry.used = true
  return !entry
})
const stale = allow.filter((entry) => !entry.used)

for (const hit of unreviewed) {
  console.error(
    `✗ ${hit.file}:${hit.line}  [${hit.rule.id}] ${hit.rule.why}\n    ${hit.text.slice(0, 160)}`,
  )
}
for (const entry of stale) {
  console.error(
    `✗ security-sinks.json: reviewed entry matches nothing now — remove it: ${entry.rule} ${entry.file} "${entry.contains}"`,
  )
}

if (unreviewed.length || stale.length) {
  console.error(
    `\n${unreviewed.length} unreviewed, ${stale.length} stale. Fix the code, or add a reviewed entry to security-sinks.json ` +
      `({ rule, file, contains, reason }) saying why this occurrence is safe.`,
  )
  process.exit(1)
}

console.log(
  `✓ security sinks: ${files.length} files, ${hits.length} reviewed occurrence(s), 0 unreviewed`,
)
