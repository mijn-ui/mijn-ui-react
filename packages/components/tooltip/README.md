# @mijn-ui/react-tooltip

A short label shown on hover or keyboard focus.

[Documentation](https://mijn-ui.vercel.app/react/docs/components/tooltip)

## Installation

```sh
npm install @mijn-ui/react-tooltip
```

## Usage

`<TooltipProvider />` is required. Mount one near the root of the app rather
than around each tooltip — it owns the shared hover delay, which is what lets a
second trigger open instantly instead of re-waiting the full delay.

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>Add to your library</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## License

This project is licensed under the terms of the [MIT license.](https://github.com/mijn-ui/mijn-ui-react/blob/main/LICENSE)
