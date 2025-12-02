import { ChevronDownIcon } from "@mijn-ui/shared-icons"
import { StoryObj } from "@storybook/react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionProps,
  AccordionTrigger,
} from "./accordion"

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  args: {
    type: "single",
    collapsible: true,
    unstyled: false,
    variant: "default",
  },
  argTypes: {
    type: {
      type: "string",
      control: "select",
      options: ["single", "multiple"],
    },
  },
}

export default meta

const AccordionTemplate = (args: AccordionProps) => (
  <Accordion className="w-80" {...args}>
    <AccordionItem value="item-1">
      <AccordionTrigger>What is your return policy?</AccordionTrigger>
      <AccordionContent>
        You can return unused items within 30 days for a full refund or
        exchange.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-2">
      <AccordionTrigger>How do I track my order?</AccordionTrigger>
      <AccordionContent>
        You can track your order by logging into your account and clicking on
        &apos;Order History&apos;.{" "}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

const AccordionVariants = (args: AccordionProps) => {
  return (
    <div className="flex flex-col w-96 items-center gap-8">
      <Accordion className="w-full" {...args} variant="default">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            You can return unused items within 30 days for a full refund or
            exchange.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How do I track my order?</AccordionTrigger>
          <AccordionContent>
            You can track your order by logging into your account and clicking
            on &apos;Order History&apos;.{" "}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion className="w-full" {...args} variant="contained">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            You can return unused items within 30 days for a full refund or
            exchange.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How do I track my order?</AccordionTrigger>
          <AccordionContent>
            You can track your order by logging into your account and clicking
            on &apos;Order History&apos;.{" "}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion className="w-full" {...args} variant="splitted">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            You can return unused items within 30 days for a full refund or
            exchange.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How do I track my order?</AccordionTrigger>
          <AccordionContent>
            You can track your order by logging into your account and clicking
            on &apos;Order History&apos;.{" "}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion className="w-full" {...args} variant="subtle">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            You can return unused items within 30 days for a full refund or
            exchange.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How do I track my order?</AccordionTrigger>
          <AccordionContent>
            You can track your order by logging into your account and clicking
            on &apos;Order History&apos;.{" "}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

const AccordionWithCustomIcons = (args: AccordionProps) => (
  <Accordion className="md:w-xl w-60" {...args}>
    <AccordionItem value="item-1">
      <AccordionTrigger
        icon={
          <>
            <PlusIcon className="duration-400 size-4 shrink-0 transition-transform group-data-[state=open]:hidden" />
            <MinusIcon className="duration-400 size-4 shrink-0 transition-transform group-data-[state=closed]:hidden" />
          </>
        }
      >
        Is it accessible
      </AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger
        icon={
          <>
            <PlusIcon className="duration-400 size-4 shrink-0 transition-transform group-data-[state=open]:hidden" />
            <MinusIcon className="duration-400 size-4 shrink-0 transition-transform group-data-[state=closed]:hidden" />
          </>
        }
      >
        Is it unstyled
      </AccordionTrigger>
      <AccordionContent>
        Yes, you can make the components unstyled by setting the{" "}
        <span className="font-semibold">unstyled</span> prop to{" "}
        <span className="font-semibold">true</span> on either a single component
        or a parent component.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger
        icon={
          <>
            <PlusIcon className="duration-400 size-4 shrink-0 transition-transform group-data-[state=open]:hidden" />
            <MinusIcon className="duration-400 size-4 shrink-0 transition-transform group-data-[state=closed]:hidden" />
          </>
        }
      >
        Is it animated?
      </AccordionTrigger>
      <AccordionContent>
        Yes! You can animate the Accordion with CSS or JavaScript.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

const AccordionUnstyled = (args: AccordionProps) => (
  <Accordion
    {...args}
    className="md:w-xl border w-60 rounded-2xl border-orange-500 p-4"
  >
    <AccordionItem className="my-2" value="item-1">
      <AccordionTrigger
        className="group flex w-full items-center justify-between bg-neutral-200 px-4 py-2 text-left dark:bg-neutral-800"
        icon={
          <ChevronDownIcon className="group-data-[state=open]:rotate-180" />
        }
      >
        Is it accessible
      </AccordionTrigger>
      <AccordionContent className="bg-neutral-300 px-4 py-2 text-sm dark:bg-neutral-700">
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem className="my-2" value="item-2">
      <AccordionTrigger
        className="group flex w-full items-center justify-between bg-neutral-200 px-4 py-2 text-left dark:bg-neutral-800"
        icon={
          <ChevronDownIcon className="group-data-[state=open]:rotate-180" />
        }
      >
        Is it unstyled
      </AccordionTrigger>
      <AccordionContent className="bg-neutral-300 px-4 py-2 text-sm dark:bg-neutral-700">
        Yes, you can make the components unstyled by setting the{" "}
        <span className="font-semibold">unstyled</span> prop to{" "}
        <span className="font-semibold">true</span> on either a single component
        or a parent component.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem className="my-2" value="item-3">
      <AccordionTrigger
        className="group flex w-full items-center justify-between bg-neutral-200 px-4 py-2 text-left dark:bg-neutral-800"
        icon={
          <ChevronDownIcon className="group-data-[state=open]:rotate-180" />
        }
      >
        Is it animated?
      </AccordionTrigger>
      <AccordionContent className="bg-neutral-300 px-4 py-2 text-sm dark:bg-neutral-700">
        Yes! You can animate the Accordion with CSS or JavaScript.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

const AccordionCustomStyles = (args: AccordionProps) => {
  return (
    <Accordion {...args}>
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

type Story = StoryObj<typeof meta>

export const Variants: Story = {
  render: AccordionVariants,
}

export const Default: Story = {
  render: AccordionTemplate,
}

export const SingleExpand: Story = {
  render: AccordionTemplate,
  args: {
    type: "single",
  },
}

export const MultipleExpand: Story = {
  render: AccordionTemplate,
  args: {
    type: "multiple",
  },
}

export const CustomIcon: Story = {
  render: AccordionWithCustomIcons,
}

export const CustomStyles: Story = {
  render: AccordionCustomStyles,
  args: {
    classNames: {
      base: "md:w-xl w-60 rounded-2xl p-4 bg-linear-to-tr from-bg-brand/20 to-bg-brand/50 dark:from-bg-brand/10 dark:to-bg-brand/30",
      item: "border-none bg-white/50 dark:bg-white/20 my-2 backdrop-blur rounded-lg px-4",
      contentWrapper: "",
      content: "",
      triggerWrapper: "",
      trigger: "rounded-lg text-fg-brand",
      icon: "",
    },
  },
}

export const Unstyled: Story = {
  render: AccordionUnstyled,
  args: {
    unstyled: true,
  },
}

const PlusIcon = ({ ...props }: React.ComponentProps<"svg">) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.99998 3.3335V16.6668M16.6666 10.0002H3.33331"
      stroke="#71717A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const MinusIcon = ({ ...props }: React.ComponentProps<"svg">) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
)
