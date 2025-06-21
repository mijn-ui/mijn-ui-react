import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@mijn-ui/react"

const AccordionCustomStyles = () => {
  return (
    <Accordion
      classNames={{
        base: "max-w-96 w-full rounded-2xl p-4 bg-gradient-to-tr from-primary/20 to-primary/50 dark:from-primary/10 dark:to-primary/30", // [!code highlight]
        item: "border-none bg-white/50 dark:bg-white/20 my-2 backdrop-blur rounded-lg px-4", // [!code highlight]
        contentWrapper: "", // [!code highlight]
        content: "", // [!code highlight]
        triggerWrapper: "", // [!code highlight]
        trigger: "rounded-lg text-primary", // [!code highlight]
        icon: "", // [!code highlight]
      }}
      type="single"
      collapsible
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it unstyled</AccordionTrigger>
        <AccordionContent>
          Yes, you can make the components unstyled by setting the{" "}
          <span className="font-semibold">unstyled</span> prop to{" "}
          <span className="font-semibold">true</span> on either a single
          component or a parent component.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes! You can animate the Accordion with CSS or JavaScript.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default AccordionCustomStyles
