"use client"

import * as React from "react"
import { EventDropArg, EventSourceInput } from "@fullcalendar/core"
import { DropArg, EventResizeDoneArg } from "@fullcalendar/interaction"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@mijn-ui/react"
import { Button } from "@mijn-ui/react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@mijn-ui/react"
import { Input } from "@mijn-ui/react"
import { useMediaQuery } from "@mijn-ui/react-hooks"
import { setMonth, setYear } from "date-fns"
import { Bug } from "lucide-react"
import { CalendarFull } from "./components/calendar-full"

const now = new Date()
const currentYear = now.getFullYear()
const currentMonth = now.getMonth()

export const initialEvents = [
  {
    title: "Designer Conference",
    start: setYear(
      setMonth(new Date(currentYear, currentMonth, 1, 0, 0), currentMonth),
      currentYear,
    ),
    end: setYear(
      setMonth(new Date(currentYear, currentMonth, 3, 23, 59), currentMonth),
      currentYear,
    ),
    allDay: true,
    id: 1723739962914,
  },
  {
    title: "Boot Camp",
    start: setYear(
      setMonth(new Date(currentYear, currentMonth, 23, 9, 30), currentMonth),
      currentYear,
    ),
    end: setYear(
      setMonth(new Date(currentYear, currentMonth, 23, 4, 0), currentMonth),
      currentYear,
    ),
    allDay: false,
    id: 1723739962914,
  },
  {
    title: "Contract",
    start: setYear(
      setMonth(new Date(currentYear, currentMonth, 24, 9, 30), currentMonth),
      currentYear,
    ),
    end: setYear(
      setMonth(new Date(currentYear, currentMonth, 25, 23, 59), currentMonth),
      currentYear,
    ),
    allDay: true,
    id: 1723739962124,
  },
  {
    title: "Launch Application",
    start: setYear(
      setMonth(new Date(currentYear, currentMonth, 29, 0, 0), currentMonth),
      currentYear,
    ),
    end: setYear(
      setMonth(new Date(currentYear, currentMonth, 30, 23, 59), currentMonth),
      currentYear,
    ),
    allDay: true,
    id: 1723739965624,
  },
  {
    title: "Conference",
    start: setYear(
      setMonth(new Date(currentYear, currentMonth, 4, 0, 0), currentMonth),
      currentYear,
    ),
    end: setYear(
      setMonth(new Date(currentYear, currentMonth, 6, 23, 59), currentMonth),
      currentYear,
    ),
    allDay: true,
    id: 1723739979790,
  },
  {
    title: "Kickoff Meeting",
    start: setYear(
      setMonth(new Date(currentYear, currentMonth, 4, 10, 0), currentMonth),
      currentYear,
    ),
    end: setYear(
      setMonth(new Date(currentYear, currentMonth, 4, 11, 30), currentMonth),
      currentYear,
    ),
    allDay: false,
    id: 1723740001335,
  },
  {
    title: "Project Proposal",
    start: setYear(
      setMonth(new Date(currentYear, currentMonth, 7, 2, 0), currentMonth),
      currentYear,
    ),
    end: setYear(
      setMonth(new Date(currentYear, currentMonth, 7, 2, 30), currentMonth),
      currentYear,
    ),
    allDay: false,
    id: 1723740001335,
  },
  {
    title: "User Meeting",
    start: setYear(
      setMonth(new Date(currentYear, currentMonth, 7, 0, 0), currentMonth),
      currentYear,
    ),
    end: setYear(
      setMonth(new Date(currentYear, currentMonth, 7, 23, 59), currentMonth),
      currentYear,
    ),
    allDay: true,
    id: 1723740021335,
  },
  {
    title: "Interface Testing",
    start: setYear(
      setMonth(new Date(currentYear, currentMonth, 7, 2, 0), currentMonth),
      currentYear,
    ),
    end: setYear(
      setMonth(new Date(currentYear, currentMonth, 7, 2, 30), currentMonth),
      currentYear,
    ),
    allDay: false,
    id: 1623740001335,
  },
]

type Event = {
  title: string
  start: Date | string
  end: Date | string
  allDay: boolean
  id: number
}

const CalendarFullExample = () => {
  const [events, setEvents] = React.useState<Event[]>(initialEvents)
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const [eventIdToDelete, setEventIdToDelete] = React.useState<number | null>(
    null,
  )
  const [newEvent, setNewEvent] = React.useState<Event>({
    title: "",
    start: "",
    end: "",
    allDay: false,
    id: 0,
  })

  const isDesktop = useMediaQuery("(min-width: 768px)")

  // Handler for date click
  const handleDateClick = (arg: { date: Date; allDay: boolean }) => {
    setNewEvent({
      ...newEvent,
      start: arg.date,
      allDay: arg.allDay,
      id: generateId(),
    })
    setIsAddDialogOpen(true)
  }

  // Handler to add new event
  const addEvent = (data: DropArg) => {
    const newEventData = {
      ...newEvent,
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: generateId(),
    }
    setEvents([...events, newEventData])
  }

  // Handler to open delete dialog
  const openDeleteDialog = (data: { event: { id: string } }) => {
    setIsDeleteDialogOpen(true)
    setEventIdToDelete(Number(data.event.id))
  }

  // Handler to delete event
  const deleteEvent = () => {
    setEvents(events.filter((event) => event.id !== eventIdToDelete))
    setIsDeleteDialogOpen(false)
    setEventIdToDelete(null)
  }

  // Handler to close all dialogs
  const closeDialogs = () => {
    setIsAddDialogOpen(false)
    setNewEvent({
      title: "",
      start: "",
      end: "",
      allDay: false,
      id: 0,
    })
    setIsDeleteDialogOpen(false)
    setEventIdToDelete(null)
  }

  // Handler to change event title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({
      ...newEvent,
      title: e.target.value,
    })
  }

  // Handler to submit new event
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEvents([...events, newEvent])
    closeDialogs()
  }

  // Handler to resize events
  const handleResize = (args: EventResizeDoneArg) => {
    const updatedEvents = events.map((event) =>
      event.id === Number(args.event.id)
        ? {
            ...event,
            allDay: args.event.allDay,
            start: args.event.start?.toISOString() || "",
            end: args.event.end?.toISOString() || "",
          }
        : event,
    )
    setEvents(updatedEvents)
  }

  // Handler to drop events
  const handleEventDrop = (args: EventDropArg) => {
    const updatedEvents = events.map((event) =>
      event.id === Number(args.event.id)
        ? {
            ...event,
            allDay: args.event.allDay,
            start: args.event.start?.toISOString() || "",
            end: args.event.end?.toISOString() || "",
          }
        : event,
    )
    setEvents(updatedEvents)
  }

  // generate id utils
  const generateId = () => {
    return Math.floor(Math.random() * Date.now())
  }

  if (!isDesktop) {
    return (
      <div>
        <p>Calendar is only available in the desktop version</p>
      </div>
    )
  }

  return (
    <div className="flex size-full items-center justify-center">
      <div className="relative h-fit w-full max-w-screen-lg overflow-y-auto rounded-2xl bg-card p-4">
        {/* TODO: Fix the hydration error */}
        <div className="size-full">
          <CalendarFull
            events={events as EventSourceInput}
            eventResize={handleResize}
            eventDrop={handleEventDrop}
            drop={addEvent}
            dateClick={handleDateClick}
            eventClick={openDeleteDialog}
          />
        </div>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
          </DialogHeader>
          <div>
            <form action="submit" onSubmit={handleSubmit}>
              <Input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleTitleChange}
                placeholder="Event Title..."
              />

              <DialogFooter className="mt-4">
                <Button type="button" variant="ghost" onClick={closeDialogs}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  disabled={newEvent.title === ""}
                >
                  Create
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Event Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="p-5 sm:p-6">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
              <Bug className="size-6 text-danger" aria-hidden="true" />
            </div>
            <div className="text-center sm:ml-4 sm:mt-0 sm:text-left">
              <AlertDialogTitle>Delete Event</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this event?
              </AlertDialogDescription>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDialogs}>Cancel</AlertDialogCancel>
            <Button type="button" color="danger" onClick={deleteEvent}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default CalendarFullExample
