import { FaBoxArchive } from "react-icons/fa6"

const ScreenStateShowcase = () => {
  return (
    <div className="flex w-full max-w-screen-sm flex-col items-center justify-center space-y-2 rounded-2xl bg-card p-4 text-center text-card-foreground shadow-small">
      <FaBoxArchive className="size-4 text-muted" />
      <div className="flex w-full flex-col items-center space-y-1">
        <div className="h-3 w-20 rounded-medium bg-accent" />
        <div className="h-2 w-2/3 rounded-medium bg-accent" />
        <div className="h-2 w-2/3 rounded-medium bg-accent" />
      </div>
      <div className="flex items-center justify-center gap-2 p-0">
        <div className="h-[22px] w-12 rounded-medium bg-accent" />
        <div className="h-[22px] w-16 rounded-medium bg-accent" />
      </div>
    </div>
  )
}

export default ScreenStateShowcase
