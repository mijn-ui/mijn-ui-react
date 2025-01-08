import { Checkbox } from "@mijn-ui/react"
import { Label } from "@mijn-ui/react"

const CheckboxColors = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="primary" color="primary" />
        <Label htmlFor="primary">Primary</Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="secondary" color="secondary" />
        <Label htmlFor="secondary">Secondary</Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="accent" color="default" />
        <Label htmlFor="accent">Accent</Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="muted" color="default" />
        <Label htmlFor="muted">Muted</Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="danger" color="danger" />
        <Label htmlFor="danger">Danger</Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="success" color="success" />
        <Label htmlFor="success">Success</Label>
      </div>
    </div>
  )
}

export default CheckboxColors
