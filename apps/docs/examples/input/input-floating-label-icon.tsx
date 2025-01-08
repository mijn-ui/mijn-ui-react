import { Input } from "@mijn-ui/react"
import { LuPlus } from "react-icons/lu"

const InputWithFloatingLabelIcon = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* start Icon */}
      <Input className="w-80" label="Username" startIcon={<LuPlus />} />

      {/* end Icon */}
      <Input className="w-80" endIcon={<LuPlus />} label="Username" />

      {/* both Icon */}
      <Input
        className="w-80"
        endIcon={<LuPlus />}
        label="Username"
        startIcon={<LuPlus />}
      />
    </div>
  )
}

export default InputWithFloatingLabelIcon
