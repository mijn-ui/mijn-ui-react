import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@mijn-ui/react"
import { MdErrorOutline } from "react-icons/md"

const AlertOutline = () => {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      {/* ----------------------------- Default ---------------------------- */}
      <Alert className="w-full max-w-lg" color="default" variant={"outlined"}>
        <AlertIcon>
          {" "}
          <MdErrorOutline />
        </AlertIcon>
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is a outline default Alert.</AlertDescription>
      </Alert>

      {/* ----------------------------- Success ---------------------------- */}
      <Alert className="w-full max-w-lg" color={"success"} variant={"outlined"}>
        <AlertIcon>
          {" "}
          <MdErrorOutline />
        </AlertIcon>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>This is a outline Success Alert.</AlertDescription>
      </Alert>

      {/* ----------------------------- Warning ---------------------------- */}
      <Alert className="w-full max-w-lg" color={"warning"} variant={"outlined"}>
        <AlertIcon>
          {" "}
          <MdErrorOutline />
        </AlertIcon>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>This is a outline Warning Alert.</AlertDescription>
      </Alert>

      {/* ----------------------------- Danger ---------------------------- */}
      <Alert className="w-full max-w-lg" color={"danger"} variant={"outlined"}>
        <AlertIcon>
          {" "}
          <MdErrorOutline />
        </AlertIcon>
        <AlertTitle>Danger</AlertTitle>
        <AlertDescription>This is a outline Danger Alert.</AlertDescription>
      </Alert>

      {/* ------------------------------ Info ----------------------------- */}
      <Alert className="w-full max-w-lg" color={"info"} variant={"outlined"}>
        <AlertIcon>
          {" "}
          <MdErrorOutline />
        </AlertIcon>
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>This is a outline Info Alert.</AlertDescription>
      </Alert>
    </div>
  )
}

export default AlertOutline
