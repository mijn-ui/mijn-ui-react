import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@mijn-ui/react"
import { FileWarning } from "lucide-react"

const AlertColors = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* --------------------------------- Success -------------------------------- */}
      <Alert className="w-full max-w-lg" color="success">
        <AlertIcon>
          <Icons.CheckCircleIcon />
        </AlertIcon>
        <AlertTitle>Deployment Successful</AlertTitle>
        <AlertDescription>
          Your application has been successfully deployed.
        </AlertDescription>
      </Alert>

      {/* --------------------------------- Info -------------------------------- */}
      <Alert className="w-full max-w-lg" color="info">
        <AlertIcon>
          <Icons.RocketOutlineIcon />
        </AlertIcon>
        <AlertTitle>New Feature Added</AlertTitle>
        <AlertDescription>
          A new feature has been added to the project.
        </AlertDescription>
      </Alert>

      {/* --------------------------------- Warning -------------------------------- */}
      <Alert className="w-full max-w-lg" color="warning">
        <AlertIcon>
          <FileWarning />
        </AlertIcon>
        <AlertTitle>High Memory Usage</AlertTitle>
        <AlertDescription>
          The application is using a high amount of memory.
        </AlertDescription>
      </Alert>

      {/* --------------------------------- Danger -------------------------------- */}
      <Alert className="w-full max-w-lg" color="danger">
        <AlertIcon>
          <Icons.ErrorOutlineIcon />
        </AlertIcon>
        <AlertTitle>Build Failed</AlertTitle>
        <AlertDescription>
          The latest build has failed. Please check the logs for details.
        </AlertDescription>
      </Alert>

      {/* ----------------------------- Muted/Default ---------------------------- */}
      <Alert className="w-full max-w-lg" color="default">
        <AlertIcon>
          <Icons.ErrorOutlineIcon />
        </AlertIcon>
        <AlertTitle>New Feature Added</AlertTitle>
        <AlertDescription>
          A new feature has been added to the project.
        </AlertDescription>
      </Alert>
    </div>
  )
}

const Icons = {
  CheckCircleIcon: (props: React.HTMLAttributes<SVGSVGElement>) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={0}
      viewBox="0 0 32 32"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z" />
    </svg>
  ),
  RocketOutlineIcon: (props: React.HTMLAttributes<SVGSVGElement>) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={0}
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M461.81 53.81a4.4 4.4 0 0 0-3.3-3.39c-54.38-13.3-180 34.09-248.13 102.17a294.9 294.9 0 0 0-33.09 39.08c-21-1.9-42-.3-59.88 7.5-50.49 22.2-65.18 80.18-69.28 105.07a9 9 0 0 0 9.8 10.4l81.07-8.9a180.29 180.29 0 0 0 1.1 18.3 18.15 18.15 0 0 0 5.3 11.09l31.39 31.39a18.15 18.15 0 0 0 11.1 5.3 179.91 179.91 0 0 0 18.19 1.1l-8.89 81a9 9 0 0 0 10.39 9.79c24.9-4 83-18.69 105.07-69.17 7.8-17.9 9.4-38.79 7.6-59.69a293.91 293.91 0 0 0 39.19-33.09c68.38-68 115.47-190.86 102.37-247.95zM298.66 213.67a42.7 42.7 0 1 1 60.38 0 42.65 42.65 0 0 1-60.38 0z"
      />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M109.64 352a45.06 45.06 0 0 0-26.35 12.84C65.67 382.52 64 448 64 448s65.52-1.67 83.15-19.31A44.73 44.73 0 0 0 160 402.32"
      />
    </svg>
  ),
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

export default AlertColors
