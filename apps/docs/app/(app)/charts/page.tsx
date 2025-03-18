import React from "react"
import { cn } from "@mijn-ui/react"
import * as Charts from "./charts"

const ChartsPage = () => {
  return (
    <main className="mt-14 w-full sm:mt-28 ">
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
          <ChartWrapper className="border-y">
            <Charts.AreaChart01 />
          </ChartWrapper>
          <ChartWrapper className="border-y">
            <Charts.AreaChart02 />
          </ChartWrapper>
          <ChartWrapper>
            <Charts.AreaChart03 />
          </ChartWrapper>
          <ChartWrapper>
            <Charts.AreaChart04 />
          </ChartWrapper>
          <ChartWrapper>
            <Charts.BarChart01 />
          </ChartWrapper>
          <ChartWrapper>
            <Charts.BarChart02 />
          </ChartWrapper>
          <ChartWrapper>
            <Charts.BarChart03 />
          </ChartWrapper>
          <ChartWrapper>
            <Charts.BarChart04 />
          </ChartWrapper>
          <ChartWrapper>
            <Charts.BarChart05 />
          </ChartWrapper>
          <ChartWrapper>
            <Charts.LineChart01 />
          </ChartWrapper>
          <ChartWrapper>
            <Charts.LineChart02 />
          </ChartWrapper>
          <ChartWrapper>
            <Charts.LineChart03 />
          </ChartWrapper>
          <ChartWrapper>
            <Charts.LineChart04 />
          </ChartWrapper>
          <ChartWrapper>
            <Charts.LineChart05 />
          </ChartWrapper>
          <ChartWrapper>
            <Charts.LineChart06 />
          </ChartWrapper>

          {/* Dashed Border Decorator */}
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
        </div>
      </div>
    </main>
  )
}

export default ChartsPage

const ChartWrapper = ({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) => {
  return (
    <div
      className={cn(
        "border-b [mask:radial-gradient(85%_85%_at_50%,rgb(0,0,0)_65%,rgba(0,0,0,0)_90%)] lg:odd:border-r",
        className,
      )}
      {...props}
    />
  )
}
