"use client"

import React from "react"
import { Loader2 } from "lucide-react"

type ErrorBoundaryProps = {
  children: React.ReactNode
  fallback: React.ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error): void {
    console.error("Component failed to load:", error)
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

interface LazyComponentProps {
  /**
   * Path to the component to load
   */
  componentPath: string

  /**
   * Optional custom loading component
   */
  fallback?: React.ReactNode

  /**
   * Optional custom error component
   */
  errorComponent?: React.ReactNode

  /**
   * Props to pass to the loaded component
   */
  componentProps?: Record<string, unknown>
}

export default function LazyComponent({
  componentPath,
  fallback = <DefaultLoading />,
  errorComponent,
  componentProps = {},
}: LazyComponentProps): React.ReactElement {
  // Create the lazy component
  const Component = React.useMemo(() => {
    return React.lazy(() =>
      import(componentPath).catch((error: Error) => {
        console.error(`Failed to load: ${componentPath}`, error)
        return {
          default: () =>
            errorComponent || <DefaultError path={componentPath} />,
        }
      }),
    )
  }, [componentPath, errorComponent])

  // The error fallback to use
  const errorFallback = errorComponent || <DefaultError path={componentPath} />

  return (
    <ErrorBoundary fallback={errorFallback}>
      <React.Suspense fallback={fallback}>
        <Component {...componentProps} />
      </React.Suspense>
    </ErrorBoundary>
  )
}

const DefaultLoading = () => (
  <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
    <Loader2 className="mr-2 size-4 animate-spin" />
    Loading...
  </div>
)

const DefaultError = ({ path }: { path: string }) => (
  <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-red-300 p-4 text-sm">
    <p className="text-red-500">Failed to load component</p>
    <p className="text-muted-foreground">{path}</p>
  </div>
)
