import React from "react"
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  cn,
} from "@mijn-ui/react"
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"
import { Check, Copy, X } from "lucide-react"
import CopyButton from "@/app/components/copy-button"
import { getSourceCode } from "@/app/utils/get-source-code"
import * as Charts from "./charts"

const CHART_CONFIG = [
  { name: "area-chart-01", component: Charts.AreaChart01 },
  { name: "area-chart-02", component: Charts.AreaChart02 },
  { name: "area-chart-03", component: Charts.AreaChart03 },
  { name: "area-chart-04", component: Charts.AreaChart04 },

  { name: "bar-chart-01", component: Charts.BarChart01 },
  { name: "bar-chart-02", component: Charts.BarChart02 },
  { name: "bar-chart-03", component: Charts.BarChart03 },
  { name: "bar-chart-04", component: Charts.BarChart04 },
  { name: "bar-chart-05", component: Charts.BarChart05 },

  { name: "line-chart-01", component: Charts.LineChart01 },
  { name: "line-chart-02", component: Charts.LineChart02 },
  { name: "line-chart-03", component: Charts.LineChart03 },
  { name: "line-chart-04", component: Charts.LineChart04 },
  { name: "line-chart-05", component: Charts.LineChart05 },
  { name: "line-chart-06", component: Charts.LineChart06 },
]

const ChartsPage = () => {
  return (
    <main className="mt-14 w-full sm:mt-28">
      <div className="flex justify-center px-4 md:px-8">
        <div className="w-full max-w-6xl space-y-2">
          <h1 className="text-3xl font-bold md:text-4xl md:font-extrabold">
            Ready-to-Use Charts
          </h1>
          <p className="text-large text-muted-foreground">
            A collection of copy-paste-ready charts built with Recharts, <br />{" "}
            displaying various data trends in different styles.
          </p>
        </div>
      </div>

      <div className="mt-14 flex w-full justify-center bg-card px-4 py-12 sm:mt-28 md:px-8 lg:py-20">
        <div className="relative grid min-h-screen w-full max-w-7xl grid-cols-1 lg:grid-cols-2">
          {CHART_CONFIG.map(({ name, component }, index) => {
            const Component = component

            return (
              <ChartWrapper
                key={name}
                name={name}
                className={cn(
                  index <= 1 && "border-y",
                  index % 2 === 0 && "lg:border-r",
                )}
              >
                <Component />
              </ChartWrapper>
            )
          })}

          <BorderDecorator />
        </div>
      </div>
    </main>
  )
}

export default ChartsPage

type ChartWrapperProps = React.ComponentPropsWithRef<"div"> & {
  name: string
}

const ChartWrapper = ({
  name,
  className,
  children,
  ...props
}: ChartWrapperProps) => {
  const code = getSourceCode(`/charts/${name}.tsx`)

  return (
    <div
      className={cn(
        "relative border-b [mask:radial-gradient(85%_85%_at_50%,rgb(0,0,0)_65%,rgba(0,0,0,0)_90%)]",
        className,
      )}
      {...props}
    >
      <Dialog>
        <DialogTrigger unstyled asChild>
          <Button size="xs" className="absolute right-4 top-4 z-10 h-7 text-xs">
            View Code
          </Button>
        </DialogTrigger>
        <DialogContent
          unstyled
          className="fixed bottom-0 right-0 z-50 flex max-h-[80vh] w-full flex-col bg-card transition duration-500 ease-in-out data-[state=closed]:duration-500 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out max-sm:data-[state=closed]:slide-out-to-bottom max-sm:data-[state=open]:slide-in-from-bottom sm:inset-y-0 sm:max-h-none sm:w-3/4 sm:data-[state=closed]:slide-out-to-right sm:data-[state=open]:slide-in-from-right lg:max-w-2xl"
        >
          <DialogTitle className="sr-only">Source Code</DialogTitle>
          <div className="h-fit w-full">{children}</div>

          <div className="custom_scroll_bar relative mx-4 mb-4 h-full overflow-y-auto">
            <div className="sticky top-0 z-10 flex items-center justify-end px-4">
              <CopyButton
                size="xs"
                iconOnly
                aria-label="Copy Text"
                content={code}
                className="group"
              >
                <Copy className="group-data-[copied=true]:hidden" />
                <Check className="group-data-[copied=false]:hidden" />
              </CopyButton>
            </div>
            <div
              className={cn(
                "chart h-full [&_.fd-codeblock]:border-none",
                // hide default copy button
                "[&_.fd-codeblock_[aria-label='Copy_Text']]:hidden",
              )}
            >
              <DynamicCodeBlock lang="tsx" code={code} />
            </div>
          </div>

          <DialogClose unstyled asChild>
            <Button
              iconOnly
              size="sm"
              radius="full"
              variant="ghost"
              className="absolute right-4 top-4"
            >
              <X size={20} />
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {children}
    </div>
  )
}

const BorderDecorator = () => (
  <div className="pointer-events-none absolute inset-0 sm:right-px">
    <div className="absolute inset-y-0 left-px w-px">
      <div className="absolute inset-y-0 -left-px w-px opacity-35 dark:opacity-15">
        <svg className="size-full" preserveAspectRatio="none">
          <line
            x1={0}
            y1={0}
            x2={0}
            y2="100%"
            stroke="currentColor"
            strokeWidth={2}
            strokeDasharray="1 3"
          />
        </svg>
      </div>
    </div>
    <div className="absolute inset-y-0 right-px w-px">
      <div className="absolute inset-y-0 w-px opacity-35 dark:opacity-15">
        <svg className="size-full" preserveAspectRatio="none">
          <line
            x1={0}
            y1={0}
            x2={0}
            y2="100%"
            stroke="currentColor"
            strokeWidth={2}
            strokeDasharray="1 3"
          />
        </svg>
      </div>
    </div>
  </div>
)
