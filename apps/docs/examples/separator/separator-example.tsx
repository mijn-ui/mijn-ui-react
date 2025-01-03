import { Separator } from "@mijn-ui/react-separator"

const SeparatorExample = () => {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-small font-medium leading-none">
          Radix Primitives
        </h4>
        <p className="text-small text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-small">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}

export default SeparatorExample
