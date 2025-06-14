import { cn } from "@mijn-ui/react"

type FooterProps = {
  children?: React.ReactNode
  className?: string
}

const Footer = ({ children, className }: FooterProps) => {
  return (
    <footer
      className={cn(
        "flex w-full items-center justify-center border-t py-4",
        className,
      )}
    >
      <div className="flex w-full max-w-screen-lg flex-col items-center justify-between gap-2 px-5 py-2 sm:flex-row">
        <p className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-tiny font-medium tracking-tight text-transparent sm:text-small">
          All Right Reserved By MijnUI.
        </p>

        {children}
      </div>
    </footer>
  )
}

export { Footer }
