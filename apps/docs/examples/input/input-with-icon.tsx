import { Input } from "@mijn-ui/react"
import { Plus } from "lucide-react"

const InputWithIcon = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* start Icon */}
      <Input
        classNames={{ wrapper: "w-80" }}
        placeholder="Username..."
        startIcon={<Plus />}
      />

      {/* end Icon */}
      <Input
        classNames={{ wrapper: "w-80" }}
        endIcon={<Plus />}
        placeholder="Username..."
      />

      {/* both Icon */}
      <Input
        classNames={{ wrapper: "w-80" }}
        endIcon={<Plus />}
        placeholder="Username..."
        startIcon={<Plus />}
      />
    </div>
  )
}

export default InputWithIcon
