import { Input } from "@mijn-ui/react"
import { LuPlus } from "react-icons/lu"

const InputWithIcon = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* start Icon */}
      <Input
        className="w-80"
        placeholder="Username..."
        startIcon={<LuPlus />}
      />

      {/* end Icon */}
      <Input className="w-80" endIcon={<LuPlus />} placeholder="Username..." />

      {/* both Icon */}
      <Input
        className="w-80"
        endIcon={<LuPlus />}
        placeholder="Username..."
        startIcon={<LuPlus />}
      />
    </div>
  )
}

export default InputWithIcon
