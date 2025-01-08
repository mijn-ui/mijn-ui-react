import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@mijn-ui/react"
import { MdErrorOutline } from "react-icons/md"

const AlertFilled = () => {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      {/* ----------------------------- Default ---------------------------- */}
      <Alert className="w-full max-w-lg" color="default" variant={"filled"}>
        <AlertIcon>
          {" "}
          <MdErrorOutline />
        </AlertIcon>
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is a filled Default Alert.</AlertDescription>
      </Alert>

      {/* ----------------------------- Success ---------------------------- */}
      <Alert className="w-full max-w-lg" color={"success"} variant={"filled"}>
        <AlertIcon>
          {" "}
          <MdErrorOutline />
        </AlertIcon>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>This is a filled Success Alert.</AlertDescription>
      </Alert>

      {/* ----------------------------- Warning ---------------------------- */}
      <Alert className="w-full max-w-lg" color={"warning"} variant={"filled"}>
        <AlertIcon>
          {" "}
          <MdErrorOutline />
        </AlertIcon>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>This is a filled Warning Alert.</AlertDescription>
      </Alert>

      {/* ----------------------------- Danger ---------------------------- */}
      <Alert className="w-full max-w-lg" color={"danger"} variant={"filled"}>
        <AlertIcon>
          {" "}
          <MdErrorOutline />
        </AlertIcon>
        <AlertTitle>Danger</AlertTitle>
        <AlertDescription>This is a filled Danger Alert.</AlertDescription>
      </Alert>

      {/* ------------------------------ Info ----------------------------- */}
      <Alert className="w-full max-w-lg" color={"info"} variant={"filled"}>
        <AlertIcon>
          {" "}
          <MdErrorOutline />
        </AlertIcon>
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>This is a filled Info Alert.</AlertDescription>
      </Alert>
    </div>
  )
}

export default AlertFilled
