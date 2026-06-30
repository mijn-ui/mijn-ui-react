# NPM Package Publish Guide

## Overview

Publishing is fully automated via GitHub Actions (`release.yml`). It requires **two PR merges** — one for your feature, one for the version bump.

---

## Step-by-Step

### 1. Create a changeset

After making component changes, create a changeset describing what changed:

```bash
pnpm changeset
```

Or create the file manually at `.changeset/<slug>.md`:

```md
---
"@mijn-ui/react-button": minor
"@mijn-ui/react-badge": minor
---

Description of what changed and why.
```

Bump types:
- `patch` — bug fixes, style tweaks
- `minor` — new variants, new props, new components (non-breaking)
- `major` — breaking API changes (renamed/removed props or variants)

### 2. Commit and push your branch

```bash
git add .
git commit -m "feat: your changes"
git push origin your-branch
```

### 3. Merge the feature PR to main

Go to GitHub and merge your feature PR into `main`.

### 4. Merge the auto-created release PR

After the feature PR is merged, GitHub Actions automatically opens a PR titled:

> **chore(release): version packages**

from branch `changeset-release/main`. This PR bumps all package versions and updates `CHANGELOG.md` files.

Merge that PR into `main`.

### 5. Wait for publish

After the release PR is merged, the workflow runs again and publishes to npm automatically using `pnpm release` (`changeset publish`).

---

## Verifying the publish succeeded

Check GitHub Actions:
> `https://github.com/mijn-ui/mijn-ui-react/actions/workflows/release.yml`

Look for a green checkmark on the run triggered by the release PR merge.

Check npm directly:

```bash
npm view @mijn-ui/react-accordion version
npm view @mijn-ui/react-badge version
npm view @mijn-ui/react-button version
npm view @mijn-ui/react-input version
npm view @mijn-ui/react-breadcrumb version
npm view @mijn-ui/react-toast version
```

---

## Fixing a failed publish (NPM_TOKEN expired)

If packages fail with `E404 Not Found - PUT https://registry.npmjs.org/...`, the `NPM_TOKEN` has expired.

**1. Generate a new token on npm**
- Go to `npmjs.com` → profile → Access Tokens → Generate New Token
- Type: **Automation**
- Must have publish access to the `@mijn-ui` org

**2. Update the GitHub secret**
- Go to `github.com/mijn-ui/mijn-ui-react` → Settings → Secrets and variables → Actions
- Update `NPM_TOKEN` with the new token

**3. Re-trigger the workflow**
- Go to Actions → Release → Re-run failed jobs

---

## Package version reference (last checked 2026-06-24)

| Package | Version |
|---|---|
| `@mijn-ui/react-accordion` | 0.5.0 |
| `@mijn-ui/react-badge` | 0.5.0 |
| `@mijn-ui/react-button` | 0.6.0 |
| `@mijn-ui/react-input` | 0.5.0 |
| `@mijn-ui/react-breadcrumb` | 0.2.0 (new) |
| `@mijn-ui/react-toast` | 0.2.0 (new) |
