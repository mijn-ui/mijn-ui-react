import AreaChart01 from "@/charts/area-chart-01"
import AreaChart02 from "@/charts/area-chart-02"
import AreaChart03 from "@/charts/area-chart-03"
import AreaChart04 from "@/charts/area-chart-04"
import BarChart01 from "@/charts/bar-chart-01"
import BarChart02 from "@/charts/bar-chart-02"
import BarChart03 from "@/charts/bar-chart-03"
import BarChart04 from "@/charts/bar-chart-04"
import BarChart05 from "@/charts/bar-chart-05"
import LineChart01 from "@/charts/line-chart-01"
import LineChart02 from "@/charts/line-chart-02"
import LineChart03 from "@/charts/line-chart-03"
import LineChart04 from "@/charts/line-chart-04"
import LineChart05 from "@/charts/line-chart-05"
import LineChart06 from "@/charts/line-chart-06"

const Charts = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center py-20">
        <div className="w-full max-w-6xl space-y-2">
          <h1 className="text-3xl font-bold md:text-4xl md:font-extrabold">
            Charts
          </h1>
          <p className="text-medium text-muted-foreground">
            Mijnui Charts are based on real-world situations.
            <br /> Find inspiration for your next dashboard.
          </p>
        </div>
      </div>
      <main className="flex w-full justify-center bg-card py-20">
        <div className="relative grid min-h-screen w-full max-w-6xl grid-cols-2 ">
          <div className="border-b [mask:radial-gradient(85%_85%_at_50%,rgb(0,0,0)_65%,rgba(0,0,0,0)_90%)] odd:border-r">
            <AreaChart01 />
          </div>
          <div className="border-b [mask:radial-gradient(85%_85%_at_50%,rgb(0,0,0)_65%,rgba(0,0,0,0)_90%)] odd:border-r">
            <AreaChart02 />
          </div>
          <div className="border-b [mask:radial-gradient(85%_85%_at_50%,rgb(0,0,0)_65%,rgba(0,0,0,0)_90%)] odd:border-r">
            <AreaChart03 />
          </div>
          <div className="border-b [mask:radial-gradient(85%_85%_at_50%,rgb(0,0,0)_65%,rgba(0,0,0,0)_90%)] odd:border-r">
            <AreaChart04 />
          </div>
          <div className="border-b [mask:radial-gradient(85%_85%_at_50%,rgb(0,0,0)_65%,rgba(0,0,0,0)_90%)] odd:border-r">
            <BarChart01 />
          </div>
          <div className="border-b [mask:radial-gradient(85%_85%_at_50%,rgb(0,0,0)_65%,rgba(0,0,0,0)_90%)] odd:border-r">
            <BarChart02 />
          </div>
          <div className="border-b [mask:radial-gradient(85%_85%_at_50%,rgb(0,0,0)_65%,rgba(0,0,0,0)_90%)] odd:border-r">
            <BarChart03 />
          </div>
          <div className="border-b [mask:radial-gradient(85%_85%_at_50%,rgb(0,0,0)_65%,rgba(0,0,0,0)_90%)] odd:border-r">
            <BarChart04 />
          </div>
          <div className="border-b [mask:radial-gradient(85%_85%_at_50%,rgb(0,0,0)_65%,rgba(0,0,0,0)_90%)] odd:border-r">
            <BarChart05 />
          </div>
          <div className="border-b [mask:radial-gradient(85%_85%_at_50%,rgb(0,0,0)_65%,rgba(0,0,0,0)_90%)] odd:border-r">
            <LineChart01 />
          </div>
          <div className="border-b [mask:radial-gradient(85%_85%_at_50%,rgb(0,0,0)_65%,rgba(0,0,0,0)_90%)] odd:border-r">
            <LineChart02 />
          </div>
          <div className="border-b [mask:radial-gradient(85%_85%_at_50%,rgb(0,0,0)_65%,rgba(0,0,0,0)_90%)] odd:border-r">
            <LineChart03 />
          </div>
          <div className="border-b [mask:radial-gradient(85%_85%_at_50%,rgb(0,0,0)_65%,rgba(0,0,0,0)_90%)] odd:border-r">
            <LineChart04 />
          </div>
          <div className="border-b [mask:radial-gradient(85%_85%_at_50%,rgb(0,0,0)_65%,rgba(0,0,0,0)_90%)] odd:border-r">
            <LineChart05 />
          </div>
          <div className="border-b [mask:radial-gradient(85%_85%_at_50%,rgb(0,0,0)_65%,rgba(0,0,0,0)_90%)] odd:border-r">
            <LineChart06 />
          </div>

          <div className="pointer-events-none absolute inset-0 sm:right-px">
            <div className="absolute inset-y-0 left-px w-px">
              <div
                className="absolute inset-y-0 -left-px -my-20 w-px opacity-35 dark:opacity-15"
                style={{
                  maskImage:
                    "linear-gradient(transparent, white 5rem, white calc(100% - 5rem), transparent)",
                }}
              >
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
              <div
                className="absolute inset-y-0 -my-20 w-px opacity-35 dark:opacity-15"
                style={{
                  maskImage:
                    "linear-gradient(transparent, white 5rem, white calc(100% - 5rem), transparent)",
                }}
              >
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

          <div className="pointer-events-none absolute inset-0 max-xl:overflow-x-hidden sm:bottom-px">
            <div className="absolute inset-x-0 top-px h-px">
              <div
                className="absolute inset-x-0 -top-px -mx-20 h-px opacity-35 dark:opacity-15"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, white 5rem, white calc(100% - 5rem), transparent)",
                }}
              >
                <svg className="size-full" preserveAspectRatio="none">
                  <line
                    x1={0}
                    y1={0}
                    x2="100%"
                    y2={0}
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeDasharray="1 3"
                  />
                </svg>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-px h-px">
              <div
                className="absolute inset-x-0 -mx-20 mt-0.5 h-1 opacity-35 dark:opacity-15"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, white 5rem, white calc(100% - 5rem), transparent)",
                }}
              >
                <svg className="size-full" preserveAspectRatio="none">
                  <line
                    x1={0}
                    y1={0}
                    x2="100%"
                    y2={0}
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeDasharray="1 3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Charts

//
// [mask:radial-gradient(80%_80%_at_50%,rgb(0,0,0)_60%,rgba(0,0,0,0)_90%)]
// [mask:radial-gradient(80%_80%_at_50%,rgb(0,0,0)_60%,rgba(0,0,0,0)_90%)]
// [mask:radial-gradient(80%_80%_at_50%,rgb(0,0,0)_60%,rgba(0,0,0,0)_90%)]
// [mask:radial-gradient(80%_80%_at_50%,rgb(0,0,0)_60%,rgba(0,0,0,0)_90%)]
// [mask:radial-gradient(80%_80%_at_50%,rgb(0,0,0)_60%,rgba(0,0,0,0)_90%)]
// [mask:radial-gradient(80%_80%_at_50%,rgb(0,0,0)_60%,rgba(0,0,0,0)_90%)]
// [mask:radial-gradient(80%_80%_at_50%,rgb(0,0,0)_60%,rgba(0,0,0,0)_90%)]
// [mask:radial-gradient(75%_75%_at_50%,rgb(0,0,0)_60%,rgba(0,0,0,0)_90%)]
