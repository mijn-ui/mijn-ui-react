import * as React from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Blocks: Record<string, any> = {
  "calendar-full": {
    name: "calendar-full",
    title: "Calendar Full",
    description:
      "A comprehensive calendar component for displaying and managing events in a full calendar view.",
    component: React.lazy(() => import("./calendar-full")),
    iframeHeight: 930,
  },
  "kanban-column": {
    name: "kanban-column",
    title: "Kanban Column",
    description:
      "A Kanban board component with draggable columns and cards for task management.",
    component: React.lazy(() => import("./kanban-column")),
    iframeHeight: 930,
  },
  "hook-responsive-button": {
    name: "hook-responsive-button",
    title: "Hook Responsive Button",
    description:
      "A responsive button component that uses a custom hook to adjust its size based on screen dimensions.",
    component: React.lazy(() => import("./hook-responsive-button")),
    iframeHeight: 180,
  },
  "tv-responsive-button": {
    name: "tv-responsive-button",
    title: "TV Responsive Button",
    description:
      "A responsive button component that changes size dynamically based on the screen size.",
    component: React.lazy(() => import("./tv-responsive-button")),
    iframeHeight: 180,
  },
  "screen-state": {
    name: "screen-state",
    title: "Screen State",
    description:
      "A component that displays the current state of the screen with a customizable message.",
    component: React.lazy(() => import("./screen-state")),
    iframeHeight: 480,
  },
}
