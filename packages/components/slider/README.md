# @mijn-ui/react-slider

A control for choosing a value, or a range of values, from a continuous interval.

[Documentation](https://mijn-ui.vercel.app/react/docs/components/slider)

## Installation

```sh
npm install @mijn-ui/react-slider
```

## Usage

One thumb is rendered per value, so a range slider is just two values. Each
thumb is its own `role="slider"`, so name them with `thumbAriaLabels` — a single
name on the root cannot tell the two apart.

```tsx
<Slider defaultValue={[50]} />

<Slider
  defaultValue={[25, 75]}
  thumbAriaLabels={["Minimum", "Maximum"]}
/>
```

## License

This project is licensed under the terms of the [MIT license.](https://github.com/mijn-ui/mijn-ui-react/blob/main/LICENSE)
