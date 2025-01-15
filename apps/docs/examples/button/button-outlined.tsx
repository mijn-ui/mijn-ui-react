import { Button } from "@mijn-ui/react"

const ButtonOutlined = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outlined" color="default">
        Default
      </Button>
      <Button variant="outlined" color="primary">
        Primary
      </Button>
      <Button variant="outlined" color="secondary">
        Secondary
      </Button>
      <Button variant="outlined" color="success">
        Success
      </Button>
      <Button variant="outlined" color="info">
        Info
      </Button>
      <Button variant="outlined" color="warning">
        Warning
      </Button>
      <Button variant="outlined" color="danger">
        Danger
      </Button>
    </div>
  )
}

export default ButtonOutlined
