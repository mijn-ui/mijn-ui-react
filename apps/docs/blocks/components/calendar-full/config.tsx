import {
  CalendarOptions,
  DayHeaderContentArg,
  EventContentArg,
  formatDate,
} from "@fullcalendar/core"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list"
import timeGridPlugin from "@fullcalendar/timegrid"

// Utility function to format time
const formatTime = (date: Date | null): string => {
  if (!date) return ""

  const formattedTime = formatDate(date, {
    hour: "numeric",
    minute: "2-digit",
    meridiem: "short",
  }).toLowerCase()

  return formattedTime.replace(":00", "")
}

// Utility function to format day headers
const formatDayHeader = (arg: DayHeaderContentArg) => {
  const dayNumber = arg.date.getDate()
  const dayName = arg.date.toLocaleDateString(undefined, {
    weekday: "long",
  })

  return (
    <>
      <span>{dayNumber}</span> {dayName}
    </>
  )
}

// Event content rendering function
const renderEventContent = (args: EventContentArg) => {
  const formattedStart = formatTime(args.event.start)
  const formattedEnd = formatTime(args.event.end)

  return (
    <div className="custom-event-list">
      <span className="custom-event-list-title">{args.event.title}</span>

      {!args.event.allDay && (
        <span className="custom-event-list-time">
          {formattedStart}
          {formattedEnd && ` - ${formattedEnd}`}
        </span>
      )}

      {args.event.allDay && (
        <span className="custom-event-list-time">All-day</span>
      )}
    </div>
  )
}

export const calendarConfig: CalendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
  headerToolbar: {
    left: "title",
    center: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    right: "prev,today,next",
  },
  titleFormat: { year: "numeric", month: "long" },
  aspectRatio: 1.45,
  allDayClassNames: "timegrid-all-day",
  nowIndicator: true,
  editable: true,
  droppable: true,
  selectable: true,
  selectMirror: true,
  displayEventTime: true,
  fixedWeekCount: false,
  dayMaxEvents: 2,
  eventTimeFormat: {
    hour: "numeric",
    minute: "2-digit",
    meridiem: "short",
  },
  views: {
    dayGridMonth: {
      dayHeaderFormat: { weekday: "short" },
      viewClassNames: "month-view",
      dayHeaderClassNames: "month-view__day-header",
      dayCellClassNames: "month-view__day-cell",
    },
    timeGridWeek: {
      slotMinWidth: 80,
      slotLabelFormat: { timeStyle: "short", meridiem: "lowercase" },
      dayHeaderContent: formatDayHeader,
    },
    timeGridDay: {
      allDaySlot: false,
      viewClassNames: "day-view",
      dayHeaderClassNames: "day-view__day-header",
      dayCellClassNames: "day-view__day-cell",
      slotLabelFormat: { timeStyle: "short", meridiem: "lowercase" },
      dayHeaderContent: formatDayHeader,
    },
    listMonth: {
      listDayFormat: { weekday: "long", day: "numeric" },
      listDaySideFormat: false,
      displayEventTime: false,
      eventContent: renderEventContent,
    },
  },
  eventContent: (arg: EventContentArg) => {
    if (arg.event.start && arg.event.end && !arg.event.allDay) {
      const startTime = formatTime(arg.event.start)
      const endTime = formatTime(arg.event.end)
      arg.timeText = `${startTime} - ${endTime}`
    }
    return true
  },
}
