# @mijn-ui/react-sonner

A [`sonner`](https://sonner.emilkowal.ski) toaster dressed in the mijn-ui theme.

[Documentation](https://mijn-ui.vercel.app/react/docs/components/sonner)

## Installation

`sonner` is a **peer** dependency — install it alongside:

```sh
npm install @mijn-ui/react-sonner sonner
```

## Usage

Mount one `<Toaster />` near the root of the app. Every `toast()` call anywhere
in the tree renders through it.

```tsx
import { Toaster, toast } from "@mijn-ui/react-sonner"

export function App() {
  return (
    <>
      <Toaster position="bottom-right" closeButton />
      <button onClick={() => toast.success("Saved")}>Save</button>
    </>
  )
}
```

## Why `sonner` is a peer dependency

Sonner's queue is module state. If the app bundled a second copy, `toast()`
calls would land in a store that the mounted `<Toaster />` is not rendering, and
the toasts would simply never appear — with no error anywhere to explain it. As
a peer, the app resolves exactly one copy, so importing `toast` from this
package or straight from `sonner` reaches the same queue either way.

This is also why the package is **not** re-exported from the `@mijn-ui/react`
barrel: that barrel is a single entry with no subpaths, so every app importing
anything from it would pull sonner's bytes in whether or not it shows a toast.

## Theming

The toaster maps sonner's surface variables (`--normal-bg`, `--success-bg`, …)
onto mijn-ui theme tokens, so toasts follow light/dark and any re-themed palette
without per-app restyling. Pass `unstyled` to drop that mapping entirely and
supply your own `classNames`.

## License

This project is licensed under the terms of the [MIT license.](https://github.com/mijn-ui/mijn-ui-react/blob/main/LICENSE)
