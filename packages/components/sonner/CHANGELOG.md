# @mijn-ui/react-sonner

## 0.1.2

### Patch Changes

- e7050f8: Republished through npm trusted publishing from the GitHub `npm` environment. No code changes. This first publish validates the new trusted-publisher setting on every package.

## 0.1.1

### Patch Changes

- bcec8f7: Make the toaster's slot classes actually apply over sonner's own CSS.

  Sonner injects its stylesheet outside any cascade layer, and unlayered rules
  beat every Tailwind utility in `@layer utilities` regardless of specificity.
  So most slot classes lost to sonner's defaults: the title stayed at weight 500
  under `font-semibold`, the action button rendered black-on-white (sonner's
  inverse) instead of brand, and the toast kept sonner's 8px radius and shadow.
  0.7 fixed only the description's colour. Every class that competes with a
  sonner property is now `!important`; a new test reads sonner's stylesheet and
  fails if any slot class would lose again.

  What you will see change, matching what the classes always asked for:
  - **Title**: `font-semibold` (600, was 500), `text-sm` line height (20px, was
    21px). Its colour is no longer set — it inherits the toast's, as sonner
    intends, so `richColors` tints it.
  - **Description**: `text-sm` line height (20px, was 19.6px).
  - **Toast**: the theme's `--mijn-radius-lg` (12px) and `--mijn-shadow-lg`
    (were sonner's 8px radius and light shadow). Its keyboard focus indicator is
    now the theme's `mijn-focus-ring` in `ring-outline-brand` (the shadow
    replaces sonner's grey focus shadow). Background, text and border colours
    still come from sonner's variables, so `richColors` keeps working.
  - **Action button**: `bg-brand` / `on-bg-brand`, `rounded-md`, `px-2.5`
    (was sonner's inverse colours, 4px radius, 8px padding).
  - **Cancel button**: `bg-secondary` / `fg-secondary`, `rounded-md`, `px-2.5`.
  - **Close button**: `bg-default-alt`, `fg-tertiary`, `outline-secondary`
    border; on hover `bg-secondary` and `fg-default` (sonner's hover painted it
    near-white, which in dark mode left white text on a white button). With
    `richColors` the close button now stays neutral instead of taking the
    toast's tint.

  **Info colour.** With `richColors`, the `info` toast used the brand-subtle
  tier, so in an app whose brand is green it looked exactly like `success`. It
  now uses the categorical blue tier (`bg-blue-subtle` / `on-bg-blue-subtle` /
  `outline-blue-subtle`): **rich-colour info toasts are blue** in every theme
  (title contrast 8.5:1 light, 10.5:1 dark). Success, warning and error are
  unchanged. To keep the old look, set `--info-bg` / `--info-text` /
  `--info-border` on the toaster's `style`.

  To override one of these properties in your own `classNames`, add `!` too
  (`title: "font-bold!"`); see the README.

- b948a13: Require `@mijn-ui/react-core` `^0.6.0` (was `^0.5.0`). The components now
  read the `--mijn-radius-*` / `--mijn-shadow-*` tokens and the
  `mijn-focus-ring` utility, which only `theme.css` from 0.6 defines; with an
  older `theme.css` they would lose their corner radius, shadow and focus ring.
- 1025439: `theme.css` no longer redefines Tailwind's own radius and shadow scales.
  Importing it used to change `rounded-xs` … `rounded-2xl` and `shadow-xs` …
  `shadow-2xl` across your whole app, not just inside Mijn UI components.

  Mijn UI's scale now lives under its own names, `--mijn-radius-{2xs,xs,sm,base,lg,xl,2xl}`
  and `--mijn-shadow-{xs,sm,md,lg,xl,2xl,3xl}`, with the same values as before.
  Components use them as `rounded-(--mijn-radius-lg)` /
  `shadow-(--mijn-shadow-sm)`, a form tailwind-merge resolves against a
  `rounded-*` / `shadow-*` you pass in `className`, so **Mijn UI components look
  exactly as they did**. Override the `--mijn-*` tokens in your `@theme` to
  re-shape every component at once.

  **What changes in your own code** (classes you write yourself, which now get
  Tailwind's defaults again):

  | Class         | Before (Mijn UI)                             | Now (Tailwind default)                                    |
  | ------------- | -------------------------------------------- | --------------------------------------------------------- |
  | `rounded-xs`  | 4px                                          | 2px                                                       |
  | `rounded-sm`  | 6px                                          | 4px                                                       |
  | `rounded-lg`  | 12px                                         | 8px                                                       |
  | `rounded-xl`  | 16px                                         | 12px                                                      |
  | `rounded-2xl` | 20px                                         | 16px                                                      |
  | `shadow-xs`   | `0 1px 2px` slate 5%                         | `0 1px 2px 0` black 5% (same shape)                       |
  | `shadow-sm`   | `0 1px 3px` slate 10%, `0 1px 2px` slate 6%  | `0 1px 3px 0` black 10%, `0 1px 2px -1px` black 10%       |
  | `shadow-md`   | `0 4px 8px` slate 10%, `0 2px 4px` slate 6%  | `0 4px 6px -1px` black 10%, `0 2px 4px -2px` black 10%    |
  | `shadow-lg`   | `0 12px 16px` slate 8%, `0 4px 6px` slate 3% | `0 10px 15px -3px` black 10%, `0 4px 6px -4px` black 10%  |
  | `shadow-xl`   | `0 20px 24px` slate 8%, `0 8px 8px` slate 3% | `0 20px 25px -5px` black 10%, `0 8px 10px -6px` black 10% |
  | `shadow-2xl`  | `0 24px 48px` slate 18%                      | `0 25px 50px -12px` black 25%                             |

  Unchanged: `rounded-md`, `rounded-3xl` and bare `rounded` / `shadow`, which
  Mijn UI never redefined, and `rounded-2xs`, `rounded-base` and `shadow-3xl`,
  which Tailwind does not have and `theme.css` still adds. `rounded-full` is
  Tailwind's own again (`calc(infinity * 1px)` instead of `9999px`; still fully
  round).

  To keep the old values in your own code, put them back in your `@theme`
  (Mijn UI components are not affected either way):

  ```css
  @theme {
    --radius-xs: 0.25rem;
    --radius-sm: 0.375rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-2xl: 1.25rem;
    --shadow-xs: 0 1px 2px rgba(16, 24, 40, 0.05);
    --shadow-sm:
      0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06);
    --shadow-md:
      0 4px 8px rgba(16, 24, 40, 0.1), 0 2px 4px rgba(16, 24, 40, 0.06);
    --shadow-lg:
      0 12px 16px rgba(16, 24, 40, 0.08), 0 4px 6px rgba(16, 24, 40, 0.03);
    --shadow-xl:
      0 20px 24px rgba(16, 24, 40, 0.08), 0 8px 8px rgba(16, 24, 40, 0.03);
    --shadow-2xl: 0 24px 48px rgba(16, 24, 40, 0.18);
  }
  ```

  To match a Mijn UI component in your own markup, use the namespaced tokens:
  `rounded-(--mijn-radius-lg) shadow-(--mijn-shadow-sm)`.

## 0.1.0

### Minor Changes

- 630f091: Add `@mijn-ui/react-sonner` — a [`sonner`](https://sonner.emilkowal.ski)
  `<Toaster />` dressed in the mijn-ui theme, mapping sonner's surface variables
  (`--normal-bg`, `--success-bg`, …) onto the theme tokens so toasts follow
  light/dark and any re-themed palette with no per-app restyling.

  `sonner` is a **peer** dependency rather than a bundled one. Its queue is module
  state, so a second copy would accept `toast()` calls into a store the mounted
  `<Toaster />` is not rendering — the toasts would never appear, with no error to
  explain it. As a peer there is exactly one copy, so importing `toast` from this
  package or straight from `sonner` reaches the same queue.

  For the same reason the package is **not** re-exported from the
  `@mijn-ui/react` barrel: that barrel is a single entry with no subpaths, so
  re-exporting it would pull sonner's bytes, and its peer requirement, into every
  app importing anything from `@mijn-ui/react`. Install it directly:

  ```sh
  npm install @mijn-ui/react-sonner sonner
  ```
