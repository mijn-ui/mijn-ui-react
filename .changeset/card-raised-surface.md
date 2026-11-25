---
"@mijn-ui/react-card": minor
"@mijn-ui/react": minor
---

**Card is now raised in dark mode.** Its background is `bg-default-alt`, the
raised surface Popover, Dialog, Dropdown, Select, Command and Toast already
use, instead of `bg-default`, the page background.

- **Light mode**: no change (both tokens are white).
- **Dark mode**: cards go from the page colour (`hsl(240 10% 4%)`, near
  black) to the raised grey (`hsl(240 4% 16%)`), so a card stands out from
  the page instead of being outlined on it. Its `outline-secondary` border
  has the same value as the raised surface in dark mode, as on popovers and
  dialogs, so the edge now comes from the surface contrast rather than the
  border line.
- Content inside a card that sets `bg-bg-default` on purpose (to match the
  page) now shows as a darker panel inside it in dark mode. Default-variant
  Buttons (`bg-default-alt`) sit on the card the way they do in a popover:
  same fill, separated by their border and shadow.

To keep the old flat card, pass `className="bg-bg-default"` (or
`classNames={{ base: "bg-bg-default" }}`).
