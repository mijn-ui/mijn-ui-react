const KanbanShowcase = () => {
  return (
    <div className="relative w-full max-w-80 overflow-hidden rounded-2xl bg-muted py-2">
      <div className="flex w-full items-center justify-between px-3 pr-2">
        <div className="flex items-center gap-1">
          <div className="h-3 w-10 rounded-full bg-accent" />
          <div className="h-3 w-2 rounded-full bg-accent" />
        </div>
      </div>

      <div className="px-3">
        {" "}
        <div className="group relative mt-2 w-full space-y-1 rounded-lg bg-surface p-3">
          <div className="h-3 w-36 rounded-full bg-accent" />
          <div className="h-3 w-14 rounded-full bg-accent" />
          <div className="flex flex-wrap">
            <div className="h-2 w-6 rounded-full bg-accent" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="h-2 w-10 rounded-full bg-accent" />
              <div className="h-2 w-5 rounded-full bg-accent" />
            </div>
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-main-text/10"
                style={{
                  transform: "scaleX(0.75)",
                  transformOrigin: "left center",
                }}
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <div className="flex items-center gap-1">
                <div className="size-3 rounded-full bg-accent" />
                <div className="h-3 w-2 rounded-full bg-accent" />
              </div>
              <div className="flex items-center gap-1">
                <div className="size-3 rounded-full bg-accent" />
                <div className="h-3 w-2 rounded-full bg-accent" />
              </div>
              <div className="flex items-center gap-1">
                <div className="size-3 rounded-full bg-accent" />
                <div className="h-3 w-2 rounded-full bg-accent" />
              </div>
            </div>
            <div className="flex items-center justify-center -space-x-2">
              <div className="size-5 shrink-0 rounded-full bg-accent shadow-sm" />
              <div className="size-5 shrink-0 rounded-full bg-accent shadow-sm" />
              <div className="size-5 shrink-0 rounded-full bg-accent shadow-sm" />

              <div className="!ml-1.5 h-3 w-2 rounded-full bg-accent" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex items-center gap-4 px-4 py-2">
        <div className="size-3 rounded-full bg-accent" />
        <div className="h-3 w-20 rounded-full bg-accent" />
      </div>
    </div>
  )
}

export default KanbanShowcase
