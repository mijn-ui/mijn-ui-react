"use client"

import ScreenState from "./components/screen-state"

const ScreenState01 = () => {
  const handleCancel = () => {}

  const handleCreate = () => {}

  return (
    <div className="flex size-full items-center justify-center">
      <ScreenState
        title="No files found"
        description="Your search “design system” did not match any projects. Please try again."
        onCancel={handleCancel}
        onCreate={handleCreate}
      />
    </div>
  )
}

export default ScreenState01
