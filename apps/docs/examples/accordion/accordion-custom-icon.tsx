import { LuMinus, LuPlus } from "react-icons/lu"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@mijn-ui/react-accordion"

const AccordionCustomIconExample = () => {
  return (
    <Accordion className="w-full max-w-80" type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger
          icon={
            <>
              <LuPlus className="duration-400 size-4 shrink-0 transition-transform group-data-[state=open]:hidden" />
              <LuMinus className="duration-400 size-4 shrink-0 transition-transform group-data-[state=closed]:hidden" />
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
