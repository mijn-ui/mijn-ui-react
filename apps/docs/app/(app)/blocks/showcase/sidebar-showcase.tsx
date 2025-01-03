const SidebarShowcase = () => {
  return (
    <div className="flex size-full overflow-hidden rounded-medium border-small bg-card">
      <div className="flex h-full w-20 flex-col gap-1 border-r p-2">
        <div className="h-3 w-full rounded-small bg-accent"></div>

        <div className="my-1 h-px w-full bg-border"></div>

        <div className="h-1.5 w-full rounded-small bg-accent"></div>
        <div className="h-1.5 w-full rounded-small bg-accent"></div>
        <div className="h-1.5 w-full rounded-small bg-accent"></div>

        <div className="my-1 h-px w-full bg-border"></div>

        <div className="h-1.5 w-full rounded-small bg-accent"></div>
        <div className="h-1.5 w-full rounded-small bg-accent"></div>
        <div className="h-1.5 w-full rounded-small bg-accent"></div>
        <div className="h-1.5 w-full rounded-small bg-accent"></div>
        <div className="h-1.5 w-full rounded-small bg-accent"></div>
        <div className="h-1.5 w-full rounded-small bg-accent"></div>
      </div>
      <div className="flex size-full flex-col gap-2 p-2">
        <div className="grid grid-cols-3 gap-2">
          <div className="h-10 w-full rounded-medium bg-accent" />
          <div className="h-10 w-full rounded-medium bg-accent" />
          <div className="h-10 w-full rounded-medium bg-accent" />
        </div>
        <div className="size-full rounded-medium bg-accent"></div>
      </div>
    </div>
  )
}

export default SidebarShowcase
