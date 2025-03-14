import { Input } from "@mijn-ui/react"
import { Plus } from "lucide-react"

const InputWithFloatingLabelIcon = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* start Icon */}
      <Input
        classNames={{ wrapper: "w-80" }}
        label="Username"
        startIcon={<Plus />}
      />

      {/* end Icon */}
      <Input
        classNames={{ wrapper: "w-80" }}
        endIcon={<Plus />}
        label="Username"
      />

      {/* both Icon */}
      <Input
        classNames={{ wrapper: "w-80" }}
        endIcon={<Plus />}
        label="Username"
        startIcon={<Plus />}
      />
    </div>
  )
}

export default InputWithFloatingLabelIcon
