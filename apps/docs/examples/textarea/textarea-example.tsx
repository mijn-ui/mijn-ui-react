import { Label } from "@mijn-ui/react"
import { Textarea } from "@mijn-ui/react"

const TextareaExample = () => {
  return (
    <div className="w-full max-w-80 space-y-1">
      <Label>Text Area</Label>
      <Textarea placeholder="Type your message here." />
    </div>
  )
}

export default TextareaExample
