import { Blocks } from "@/blocks"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable"

type BlockerViewerProps = {
  name: string
}

const BlockViewer = ({ name }: BlockerViewerProps) => {
  const block = Blocks[name]

  return (
    <div className="">
      <div className="grid w-full gap-4">
        <ResizablePanelGroup direction="horizontal" className="relative z-10">
          <ResizablePanel
            className="relative aspect-[4/2.5] rounded-xl border bg-main md:aspect-auto"
            defaultSize={100}
            minSize={30}
          >
            <iframe
              src={`/react/view/${block.name}`}
              height={block?.iframeHeight ?? 930}
              className="relative z-20 w-full bg-main"
            />
          </ResizablePanel>
          <ResizableHandle className="relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-x-px after:-translate-y-1/2 after:rounded-full after:bg-main-border after:transition-all after:hover:h-10 md:block" />
          <ResizablePanel defaultSize={0} minSize={0} />
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

export { BlockViewer }
