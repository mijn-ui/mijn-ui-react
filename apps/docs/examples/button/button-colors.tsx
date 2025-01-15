import { Button } from "@mijn-ui/react"

const ButtonColors = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button color="default">Default</Button>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="info">Info</Button>
      <Button color="warning">Warning</Button>
      <Button color="danger">Danger</Button>
    </div>
  )
}

export default ButtonColors
