import { cn } from "@mijn-ui/react"

const PreviewWrapper = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={cn(
        "preview not-prose relative my-6 flex min-h-80 w-full items-center justify-center gap-5 rounded-large border-small p-5",
        className,
      )}
      {...props}
    />
  )
}

export default PreviewWrapper
