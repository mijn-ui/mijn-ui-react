import { Button } from "@mijn-ui/react"

const ButtonSubtle = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="subtle" color="default">
        Default
      </Button>
      <Button variant="subtle" color="primary">
        Primary
      </Button>
      <Button variant="subtle" color="secondary">
        Secondary
      </Button>
      <Button variant="subtle" color="success">
        Success
      </Button>
      <Button variant="subtle" color="info">
        Info
      </Button>
      <Button variant="subtle" color="warning">
        Warning
      </Button>
      <Button variant="subtle" color="danger">
        Danger
      </Button>
    </div>
  )
}

export default ButtonSubtle
