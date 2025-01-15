import { Checkbox, Label } from "@mijn-ui/react"

const CheckboxExample = () => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}

export default CheckboxExample
