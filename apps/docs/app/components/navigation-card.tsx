import Link from "next/link"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

type NavigationCardProps = {
  previous: {
    url: string
    name: string
  }
  next: {
    url: string
    name: string
  }
}

const NavigationCard = ({ previous, next }: NavigationCardProps) => {
  return (
    <div className="not-prose grid grid-cols-2 gap-4 pb-6">
      {previous ? (
        <Link
          href={previous.url}
          className="flex w-full flex-col gap-2 rounded-lg border bg-fd-card p-4 text-sm transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground"
        >
          <div className="inline-flex items-center gap-0.5 text-fd-muted-foreground">
            <LuChevronLeft className="-ms-1 size-4 shrink-0 rtl:rotate-180" />
            <p>Previous</p>
          </div>
          <p className="font-medium">{previous.name}</p>
        </Link>
      ) : null}
      {next ? (
        <Link
          href={next.url}
          className={
            "col-start-2 flex w-full flex-col gap-2 rounded-lg border bg-fd-card p-4 text-end text-sm transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground"
          }
        >
          <div className="inline-flex flex-row-reverse items-center gap-0.5 text-fd-muted-foreground">
            <LuChevronRight className="-me-1 size-4 shrink-0 rtl:rotate-180" />
            <p>Next</p>
          </div>
          <p className="font-medium">{next.name}</p>
        </Link>
      ) : null}
    </div>
  )
}

export default NavigationCard
