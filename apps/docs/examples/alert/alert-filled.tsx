import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@mijn-ui/react"

const AlertFilled = () => {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      {/* ----------------------------- Default ---------------------------- */}
      <Alert className="w-full max-w-lg" color="default" variant={"filled"}>
        <AlertIcon>
          {" "}
          <Icons.ErrorOutlineIcon />
        </AlertIcon>
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is a filled Default Alert.</AlertDescription>
      </Alert>

      {/* ----------------------------- Success ---------------------------- */}
      <Alert className="w-full max-w-lg" color={"success"} variant={"filled"}>
        <AlertIcon>
          {" "}
          <Icons.ErrorOutlineIcon />
        </AlertIcon>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>This is a filled Success Alert.</AlertDescription>
      </Alert>

      {/* ----------------------------- Warning ---------------------------- */}
      <Alert className="w-full max-w-lg" color={"warning"} variant={"filled"}>
        <AlertIcon>
          {" "}
          <Icons.ErrorOutlineIcon />
        </AlertIcon>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>This is a filled Warning Alert.</AlertDescription>
      </Alert>

      {/* ----------------------------- Danger ---------------------------- */}
      <Alert className="w-full max-w-lg" color={"danger"} variant={"filled"}>
        <AlertIcon>
          {" "}
          <Icons.ErrorOutlineIcon />
        </AlertIcon>
        <AlertTitle>Danger</AlertTitle>
        <AlertDescription>This is a filled Danger Alert.</AlertDescription>
      </Alert>

      {/* ------------------------------ Info ----------------------------- */}
      <Alert className="w-full max-w-lg" color={"info"} variant={"filled"}>
        <AlertIcon>
          {" "}
          <Icons.ErrorOutlineIcon />
        </AlertIcon>
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>This is a filled Info Alert.</AlertDescription>
      </Alert>
    </div>
  )
}

const Icons = {
  ErrorOutlineIcon: (props: React.HTMLAttributes<SVGSVGElement>) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={0}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    </svg>
  ),
}

export default AlertFilled
