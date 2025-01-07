import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@mijn-ui/react-accordion"

const SingleAccordionExample = () => {
  return (
    <Accordion className="w-full max-w-80" collapsible type="single">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default SingleAccordionExample
