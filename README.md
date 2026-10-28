# MijnUI React

Reusable React components for clean, responsive interfaces, built with Tailwind CSS v4 and Radix UI.

[Documentation](https://mijnui.vercel.app/docs/react) · [npm](https://www.npmjs.com/package/@mijn-ui/react) · [Design docs](./docs/README.md)

## Installation

Install every component from one package:

```sh
npm install @mijn-ui/react @mijn-ui/react-core tailwind-variants tailwind-merge tw-animate-css
```

Then add the theme to your global CSS — see [`@mijn-ui/react`](./packages/react/README.md) for the full setup. Each component is also published on its own as `@mijn-ui/react-<component>`.

Upgrading from Tailwind CSS v3? Follow the [migration guide](./docs/tailwind-v4-migration.md).

## Repository layout

| Path                              | Contents                                                       |
| --------------------------------- | -------------------------------------------------------------- |
| `packages/react`                  | `@mijn-ui/react` — re-exports every component and `react-core` |
| `packages/core`                   | `@mijn-ui/react-core` — theme (`theme.css`), utilities, hooks  |
| `packages/components/*`           | One package per component (`@mijn-ui/react-button`, …)         |
| `packages/utilities/shared-icons` | `@mijn-ui/shared-icons`                                        |
| `packages/storybook`              | Storybook (private)                                            |
| `docs/`                           | Design-system docs generated from the Figma file               |

## Development

Requires Node.js 22+ and pnpm 10 (`corepack enable`).

```sh
pnpm install
pnpm dev          # Storybook
pnpm build        # build every package
pnpm test
pnpm lint
pnpm types:check
```

## Releasing

Releases go through [Changesets](https://github.com/changesets/changesets):

1. Run `pnpm changeset` in your PR to describe the change and the version bump.
2. Once merged to `main`, the release workflow opens a "Version Packages" PR.
3. Merging that PR publishes to npm from GitHub Actions, with provenance.

## License

[MIT](./LICENSE)
