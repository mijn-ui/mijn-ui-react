import { Checkbox, Label } from "@mijn-ui/react"

const LabelExample = () => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms1" />
      <Label htmlFor="terms1">Accept terms and conditions</Label>
    </div>
  )
}

export default LabelExample
