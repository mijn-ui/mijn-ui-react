import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@mijn-ui/react-accordion"
import { LuMinus, LuPlus } from "react-icons/lu"

const AccordionCustomIconExample = () => {
  return (
    <Accordion className="w-full max-w-80" type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger
          icon={
            <>
              <LuPlus className="size-4 shrink-0 transition-transform duration-400 group-data-[state=open]:hidden" />
              <LuMinus className="size-4 shrink-0 transition-transform duration-400 group-data-[state=closed]:hidden" />
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
