import { cn } from "@mijn-ui/react-utilities"

type CodePreviewerProps = {
  children?: React.ReactNode
} & React.ComponentPropsWithoutRef<"div">

const ComponentPreview = ({ className, ...props }: CodePreviewerProps) => {
  return (
    <div
      className={cn(
        "preview not-prose relative flex min-h-80 w-full items-center justify-center gap-5 rounded-lg border p-5",
        className,
      )}
      {...props}
    />
  )
}

export default ComponentPreview
