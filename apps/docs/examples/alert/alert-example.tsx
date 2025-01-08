import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@mijn-ui/react"
import { IoRocketOutline } from "react-icons/io5"

const AlertExample = () => {
  return (
    <Alert className="w-full max-w-lg">
      <AlertIcon>
        <IoRocketOutline />
      </AlertIcon>
      <AlertTitle>New Feature Added</AlertTitle>
      <AlertDescription>
        A new feature has been added to the project.
      </AlertDescription>
    </Alert>
  )
}

export default AlertExample
