import React from "react"
import Link from "next/link"
import "./glow-effect.css"
import KanbanShowcase from "./showcase/kanban-showcase"
import { Card } from "@mijn-ui/react-card"
import { cn } from "@mijn-ui/react-utilities"
import ScreenStateShowcase from "./showcase/screen-state-showcase"
import GlowEffectWrapper from "./glow-effect-wrapper"
import SidebarShowcase from "./showcase/sidebar-showcase"
import CalendarShowcase from "./showcase/calendar-showcase"
import DataTableShowcase from "./showcase/data-table-showcase"
import GanttChartShowcase from "./showcase/gantt-chart-showcase"

const BlockPreviewData = [
  {
    href: "/blocks/calendar-full",
    label: "CalendarFull",
    component: <CalendarShowcase />,
  },
  {
    href: "/blocks/kanban-column",
    label: "KanBanColumn",
    component: <KanbanShowcase />,
  },
  {
    href: "/blocks/screen-state",
    label: "ScreenState",
    component: <ScreenStateShowcase />,
  },
  {
    href: "#",
    label: "Sidebar",
    inprogress: true,
    component: <SidebarShowcase />,
  },
  {
    href: "#",
    label: "DataTable",
    inprogress: true,
    component: <DataTableShowcase />,
  },
  {
    href: "#",
    label: "GanttChart",
    inprogress: true,
    component: <GanttChartShowcase />,
  },
]

const Blocks = () => {
  return (
    <GlowEffectWrapper>
      <article className="mx-auto flex w-full max-w-screen-xl flex-1 flex-col gap-6 px-4 py-10 sm:w-fit md:px-8 md:py-12">
        <h1 className="text-3xl font-bold md:text-4xl md:font-extrabold">
          Blocks
        </h1>
        <hr />
        <div className="not-prose">
          <div
            className="grid w-full grid-cols-1 place-items-center sm:p-2 md:gap-2 lg:grid-cols-2 xl:grid-cols-3"
            id="cards"
          >
            {BlockPreviewData.map((data) => (
              <LinkCard
                key={data.label}
                href={data.href}
                label={data.label}
                inprogress={data.inprogress}
              >
                {data.component}
              </LinkCard>
            ))}
          </div>
        </div>
      </article>
    </GlowEffectWrapper>
  )
}

type LinkCardProps = {
  href: string
  label: string
  inprogress?: boolean
  cardContentClass?: string
  containerClass?: string
  children: React.ReactNode
}

const LinkCard = ({
  href,
  label,
  children,
  cardContentClass,
  containerClass,
  inprogress,
}: LinkCardProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "relative col-span-1 w-full max-w-96",
        inprogress && "pointer-events-none",
        containerClass,
      )}
    >
      <Card
        className={
          "card_glow relative flex min-h-72 w-full items-center justify-center border bg-main [mask:radial-gradient(75%_75%_at_50%,rgb(0,0,0)_60%,rgba(0,0,0,0)_100%)] sm:aspect-video sm:size-full"
        }
        id="card"
      >
        <div
          className={cn(
            "card_glow_content pointer-events-none p-12",
            cardContentClass,
          )}
        >
          {children}
        </div>
      </Card>
      <div className="absolute left-0 top-0 p-2.5 sm:p-4">
        <p className="bg-gradient-to-br from-main-text to-muted-text bg-clip-text text-sm text-transparent sm:text-sm">
          {label}
        </p>
      </div>
      {inprogress && (
        <p className="absolute inset-0 flex items-center justify-center gap-1 rounded-lg bg-black/50 text-xs font-medium text-main dark:text-muted-text">
          Under Development
        </p>
      )}
    </Link>
  )
}

export default Blocks
