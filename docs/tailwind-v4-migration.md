# Tailwind CSS v3 → v4 Migration Guide

This guide covers everything you need to change in your project when upgrading from Tailwind CSS v3 to v4 while using **Mijn UI**.

---

## What changed in Mijn UI

| Area | v3 | v4 |
|------|----|----|
| Theme | `mijnui()` Tailwind plugin in `tailwind.config.js` | `@import "@mijn-ui/react-core/theme.css"` in CSS |
| CSS entry | `@tailwind base/components/utilities` directives | `@import "tailwindcss"` |
| Dark mode config | `darkMode: "class"` in `tailwind.config.js` | `@custom-variant dark` in CSS |
| Config file | Required (`tailwind.config.js`) | Not needed |
| PostCSS | `tailwindcss` PostCSS plugin | `@tailwindcss/vite` or `@tailwindcss/postcss` |

---

## Step 1 — Update dependencies

### Remove

```bash
# Remove v3 Tailwind and its companion plugins
pnpm remove tailwindcss autoprefixer
pnpm remove @tailwindcss/typography @tailwindcss/forms  # if you have these
```

### Add

**Vite projects:**
```bash
pnpm add -D tailwindcss@^4 @tailwindcss/vite@^4
```

**Non-Vite projects (webpack, Parcel, etc.):**
```bash
pnpm add -D tailwindcss@^4 @tailwindcss/postcss@^4
```

Also update Mijn UI peer dependencies if not already on these versions:
```bash
pnpm add tailwind-merge@^3 tailwind-variants@^3
```

---

## Step 2 — Remove tailwind.config.js

Tailwind v4 uses CSS for all configuration. Delete the file entirely:

```bash
rm tailwind.config.js   # or tailwind.config.ts
```

> If you had custom theme extensions (colors, spacing, fonts) in `theme.extend`, see [Step 5](#step-5--migrate-custom-theme-tokens) for how to move them to CSS.

---

## Step 3 — Update build config

### Vite

Remove `tailwindcss` and `autoprefixer` from `postcss.config.js` (or delete the file if it was only for Tailwind), then add the Vite plugin:

```ts
// vite.config.ts
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [tailwindcss(), react()],
})
```

### PostCSS (webpack / Parcel / other)

Update `postcss.config.js`:

```js
// postcss.config.js  — before
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

// postcss.config.js  — after
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
```

---

## Step 4 — Update your CSS entry file

Replace the old `@tailwind` directives with a single import, add the Mijn UI theme, and configure dark mode.

**Before (v3):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**After (v4):**
```css
@import "tailwindcss";
@import "@mijn-ui/react-core/theme.css";

/* Tell Tailwind where to scan for class names in your project */
@source "./src";

/* Class-based dark mode — matches .dark on any ancestor */
@custom-variant dark (&:where(.dark, .dark *));

@layer base {
  * {
    @apply border-outline-default;
  }
  body {
    @apply bg-bg-default text-fg-default;
  }
}
```

> **`@source`** replaces the `content` array from `tailwind.config.js`. Point it at the directory where your app's components live so Tailwind scans them for class names.

---

## Step 5 — Migrate custom theme tokens

If you extended the Tailwind theme in `tailwind.config.js`, move those values into a `@theme` block in your CSS file.

**Before (v3):**
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: "#f97316",
        "brand-dark": "#c2410c",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
}
```

**After (v4):**
```css
/* your main CSS file */
@import "tailwindcss";
@import "@mijn-ui/react-core/theme.css";

@theme {
  --color-brand: #f97316;
  --color-brand-dark: #c2410c;
  --radius-xl: 1rem;
}
```

Tailwind v4 maps CSS custom properties to utility classes automatically:
- `--color-brand` → `bg-brand`, `text-brand`, `border-brand`, etc.
- `--radius-xl` → `rounded-xl`

---

## Step 6 — Fix renamed utility classes

A small set of class names changed between v3 and v4. Search your codebase for these and rename them.

| v3 class | v4 class |
|----------|----------|
| `flex-shrink` | `shrink` |
| `flex-shrink-0` | `shrink-0` |
| `flex-grow` | `grow` |
| `flex-grow-0` | `grow-0` |
| `overflow-ellipsis` | `text-ellipsis` |
| `decoration-slice` | `box-decoration-slice` |
| `decoration-clone` | `box-decoration-clone` |
| `bg-opacity-{n}` | `bg-{color}/{n}` e.g. `bg-blue-500/50` |
| `text-opacity-{n}` | `text-{color}/{n}` e.g. `text-blue-500/50` |
| `border-opacity-{n}` | `border-{color}/{n}` |
| `shadow` (bare) | `shadow-sm` |

> Mijn UI's own components have already been updated for v4. These renames only apply to classes you've written directly in your project.

---

## Step 7 — Dark mode

In v3, dark mode was enabled in `tailwind.config.js`:

```js
// v3 — remove this
module.exports = {
  darkMode: "class",
}
```

In v4, add a `@custom-variant` in your CSS (already shown in Step 4):

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Toggle dark mode by adding/removing the `dark` class on your `<html>` or `<body>` element — same as before.

---

## Step 8 — Verify the upgrade

```bash
# Install updated deps
pnpm install

# Start dev server
pnpm dev

# Run linter
pnpm lint

# Type check
pnpm types:check
```

**In the browser, check:**

- [ ] Components render with the correct Mijn UI colors (e.g. buttons show brand orange)
- [ ] Dark mode toggle works (`.dark` class on `<html>`)
- [ ] Focus rings appear on interactive elements
- [ ] Animations work (accordions, dialogs, dropdowns)
- [ ] Your custom colors from `@theme` produce the right utility classes

---

## Troubleshooting

**Classes not being generated**

Make sure `@source` points at the right directory:
```css
@source "./src";          /* Vite / CRA */
@source "./app";          /* Next.js App Router */
@source "./pages";        /* Next.js Pages Router */
@source "./components";   /* if components live separately */
```

**Custom colors not working**

Custom properties in `@theme` must use the exact naming pattern:
- Colors: `--color-{name}` → generates `bg-{name}`, `text-{name}`, etc.
- Spacing: `--spacing-{name}` → generates `p-{name}`, `m-{name}`, etc.
- Border radius: `--radius-{name}` → generates `rounded-{name}`

**Dark mode not toggling**

Ensure `@custom-variant dark` is in your CSS **after** `@import "tailwindcss"`.

**Build tool still looking for tailwind.config.js**

If your editor or a tool still references the old config file, make sure all Tailwind-related plugins (e.g. `eslint-plugin-tailwindcss`) are removed or updated to versions that support v4.
