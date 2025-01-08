import React from "react"
import Link from "next/link"
import { Card } from "@mijn-ui/react"
import { cn } from "@mijn-ui/react"
import GlowEffectWrapper from "./glow-effect-wrapper"
import "./glow-effect.css"
import CalendarShowcase from "./showcase/calendar-showcase"
import DataTableShowcase from "./showcase/data-table-showcase"
import GanttChartShowcase from "./showcase/gantt-chart-showcase"
import KanbanShowcase from "./showcase/kanban-showcase"
import ScreenStateShowcase from "./showcase/screen-state-showcase"
import SidebarShowcase from "./showcase/sidebar-showcase"

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
          "card_glow relative flex min-h-72 w-full items-center justify-center border-small bg-background [mask:radial-gradient(75%_75%_at_50%,rgb(0,0,0)_60%,rgba(0,0,0,0)_100%)] sm:aspect-video sm:size-full"
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
        <p className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-small text-transparent sm:text-small">
          {label}
        </p>
      </div>
      {inprogress && (
        <p className="absolute inset-0 flex items-center justify-center gap-1 rounded-large bg-black/50 text-tiny font-medium text-foreground dark:text-muted-foreground">
          Under Development
        </p>
      )}
    </Link>
  )
}

export default Blocks
