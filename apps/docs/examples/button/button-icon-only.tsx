import { Button } from "@mijn-ui/react"

const ButtonIconOnly = () => {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <Button iconOnly size="xs">
        xs
      </Button>
      <Button iconOnly size="sm">
        sm
      </Button>
      <Button iconOnly size="md">
        md
      </Button>
      <Button iconOnly size="lg">
        lg
      </Button>
      <Button iconOnly size="xl">
        xl
      </Button>
    </div>
  )
}

export default ButtonIconOnly
