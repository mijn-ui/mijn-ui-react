const SidebarShowcase = () => {
  return (
    <div className="flex size-full overflow-hidden rounded-md border bg-surface">
      <div className="flex h-full w-20 flex-col gap-1 border-r p-2">
        <div className="h-3 w-full rounded-sm bg-accent"></div>

        <div className="my-1 h-px w-full bg-main-border"></div>

        <div className="h-1.5 w-full rounded-sm bg-accent"></div>
        <div className="h-1.5 w-full rounded-sm bg-accent"></div>
        <div className="h-1.5 w-full rounded-sm bg-accent"></div>

        <div className="my-1 h-px w-full bg-main-border"></div>

        <div className="h-1.5 w-full rounded-sm bg-accent"></div>
        <div className="h-1.5 w-full rounded-sm bg-accent"></div>
        <div className="h-1.5 w-full rounded-sm bg-accent"></div>
        <div className="h-1.5 w-full rounded-sm bg-accent"></div>
        <div className="h-1.5 w-full rounded-sm bg-accent"></div>
        <div className="h-1.5 w-full rounded-sm bg-accent"></div>
      </div>
      <div className="flex size-full flex-col gap-2 p-2">
        <div className="grid grid-cols-3 gap-2">
          <div className="h-10 w-full rounded-md bg-accent" />
          <div className="h-10 w-full rounded-md bg-accent" />
          <div className="h-10 w-full rounded-md bg-accent" />
        </div>
        <div className="size-full rounded-md bg-accent"></div>
      </div>
    </div>
  )
}

export default SidebarShowcase
