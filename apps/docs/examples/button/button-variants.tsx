import { Button } from "@mijn-ui/react"

const ButtonVariants = () => {
  return (
    <div className="grid grid-cols-6 gap-3">
      <Button variant="filled">Button</Button>
      <Button variant="outlined">Button</Button>
      <Button variant="ghost">Button</Button>
      <Button color="secondary" variant="filled">
        Button
      </Button>
      <Button color="secondary" variant="outlined">
        Button
      </Button>
      <Button color="secondary" variant="ghost">
        Button
      </Button>
      <Button color="default" variant="filled">
        Button
      </Button>
      <Button color="default" variant="outlined">
        Button
      </Button>
      <Button color="default" variant="ghost">
        Button
      </Button>
      <Button color="danger" variant="filled">
        Button
      </Button>
      <Button color="danger" variant="outlined">
        Button
      </Button>
      <Button color="danger" variant="ghost">
        Button
      </Button>
    </div>
  )
}

export default ButtonVariants
