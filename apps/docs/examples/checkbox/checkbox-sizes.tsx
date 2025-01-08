import { Checkbox } from "@mijn-ui/react"
import { Label } from "@mijn-ui/react"

const CheckboxSizes = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="sm" size="sm" />
        <Label htmlFor="sm">Small</Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="md" size="md" />
        <Label htmlFor="md">Medium/Default</Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="lg" size="lg" />
        <Label htmlFor="lg">Large</Label>
      </div>
    </div>
  )
}

export default CheckboxSizes
