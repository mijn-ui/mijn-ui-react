import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@mijn-ui/react"
import { Minus, Plus } from "lucide-react"

const AccordionCustomIconExample = () => {
  return (
    <Accordion className="w-full max-w-80" type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger
          icon={
            <>
              <Plus className="size-4 shrink-0 transition-transform duration-400 group-data-[state=open]:hidden" />
              <Minus className="size-4 shrink-0 transition-transform duration-400 group-data-[state=closed]:hidden" />
            </>
          }
        >
          Is it accessible
        </AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default AccordionCustomIconExample
