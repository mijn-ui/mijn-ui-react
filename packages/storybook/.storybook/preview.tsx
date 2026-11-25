import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/react-vite"
import { DocsPage } from "./docs-page"
import "./styles.css"

const preview: Preview = {
  // A docs page for every component: props table, description, every story with
  // its source, and a link to the code (docs-page.tsx).
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: DocsPage,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
}

export default preview
