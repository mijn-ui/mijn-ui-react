# @mijn-ui/react

All MijnUI components in one package — reusable React components for clean, responsive interfaces, built with Tailwind CSS v4 and Radix UI.

[Documentation](https://mijnui.vercel.app/docs/react)

## Installation

```sh
npm install @mijn-ui/react @mijn-ui/react-core tailwind-variants tailwind-merge tw-animate-css
```

pnpm users also need to hoist the MijnUI packages in `.npmrc`:

```ini
public-hoist-pattern[]=*@mijn-ui/*
```

## Setup (Tailwind CSS v4)

Add the theme to your global CSS and let Tailwind scan the components for class names:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@mijn-ui/react-core/theme.css";

@source "../../node_modules/@mijn-ui";

/* Class-based dark mode */
@custom-variant dark (&:where(.dark, .dark *));
```

Adjust the `@source` path so it points at your `node_modules/@mijn-ui` folder.

## Usage

```tsx
import { Button } from "@mijn-ui/react"

export default function App() {
  return <Button>Click me</Button>
}
```

Upgrading from Tailwind CSS v3? See the [migration guide](https://github.com/mijn-ui/mijn-ui-react/blob/main/docs/tailwind-v4-migration.md).

## License

This project is licensed under the terms of the [MIT license.](https://github.com/mijn-ui/mijn-ui-react/blob/main/LICENSE)
