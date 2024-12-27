import { calendarConfig } from "./config"
import "./styles/index.css"
import { CalendarOptions, EventSourceInput } from "@fullcalendar/core/index.js"
import FullCalendarComponent from "@fullcalendar/react"

type CalendarFullProps = CalendarOptions & {
  events?: EventSourceInput
}

const CalendarFull = ({ events, ...userConfig }: CalendarFullProps) => {
  // Merge default config with user-provided config
  const mergedConfig = {
    ...calendarConfig,
    ...userConfig, // User config overrides the default one
    plugins: [...(calendarConfig.plugins || []), ...(userConfig.plugins || [])], // Merge plugins
    views: {
      ...calendarConfig.views,
      ...userConfig.views, // Merge views
    },
  }

  return <FullCalendarComponent events={events} {...mergedConfig} />
}

export { CalendarFull }
