import { Button } from "@mijn-ui/react"

const ButtonRadius = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button radius="sm">Button</Button>
      <Button radius="md">Button</Button>
      <Button radius="lg">Button</Button>
      <Button radius="full">Button</Button>
    </div>
  )
}

export default ButtonRadius
