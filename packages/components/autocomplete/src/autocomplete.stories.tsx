import { Input } from "@mijn-ui/react-input"
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteGroup,
  AutocompleteItem,
  AutocompleteProps,
  AutocompleteTrigger,
} from "./autocomplete"
import { useState } from "react"
import { ChevronDownIcon, SearchIcon } from "@mijn-ui/shared-icons"
import { Meta } from "@storybook/react"
import { ScrollArea } from "@mijn-ui/react-scroll-area"
import { Button } from "@mijn-ui/react-button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@mijn-ui/react-dialog"

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autcomplete",
  component: Autocomplete,
  parameters: {
    layout: "centered",
  },
  args: {
    unstyled: false,
    value: "Next.js",
  },
}

export default meta

const FRAMEWORKS1 = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
  "WordPress",
  "Express.js",
]

const FRAMEWORKS2 = [
  ...FRAMEWORKS1,
  "Nest.js",
  "Angular",
  "Vue.js",
  "Ember.js",
  "Backbone.js",
  "Meteor.js",
  "Django",
  "Flask",
  "Laravel",
  "Spring Boot",
  "Ruby on Rails",
  "Phoenix",
  "Gatsby.js",
  "Strapi",
  "Fastify",
  "Hapi.js",
  "AdonisJS",
]

const AutocompleteTemplate = (args: AutocompleteProps) => {
  const [value, setValue] = useState(args.value)

  return (
    <Autocomplete
      value={value}
      onValueChange={setValue}
      unstyled={args.unstyled}
    >
      <AutocompleteTrigger asChild>
        <Input
          className="bg-surface"
          placeholder={"Search for a framework"}
          startIcon={<SearchIcon />}
          unstyled={args.unstyled}
        />
      </AutocompleteTrigger>
      <AutocompleteContent emptyMessage="No Frameworks Found" loading={false}>
        {FRAMEWORKS1.map((framework) => (
          <AutocompleteItem key={framework} value={framework}>
            {framework}
          </AutocompleteItem>
        ))}
      </AutocompleteContent>
    </Autocomplete>
  )
}

const AutocompleteWithScrollArea = (args: AutocompleteProps) => {
  const [value, setValue] = useState(args.value)

  return (
    <Autocomplete
      value={value}
      onValueChange={setValue}
      unstyled={args.unstyled}
    >
      <AutocompleteTrigger asChild>
        <Input
          unstyled={args.unstyled}
          className="bg-surface"
          placeholder={"Search for a framework"}
          startIcon={<SearchIcon />}
        />
      </AutocompleteTrigger>
      <AutocompleteContent
        className=""
        emptyMessage="No Frameworks Found"
        loading={false}
      >
        <ScrollArea className="flex max-h-52 flex-col overflow-y-auto">
          <AutocompleteGroup>
            {FRAMEWORKS2.map((framework) => (
              <AutocompleteItem key={framework} value={framework}>
                {framework}
              </AutocompleteItem>
            ))}
          </AutocompleteGroup>
        </ScrollArea>
      </AutocompleteContent>
    </Autocomplete>
  )
}

const AutoCompleteWithDialog = (args: AutocompleteProps) => {
  const [value, setValue] = useState(args.value)

  return (
    <Dialog>
      <DialogTrigger>Add User</DialogTrigger>
      <DialogContent>
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <DialogTitle>User Information</DialogTitle>
        </div>
        <Input placeholder="Username" />
        <Input placeholder="Email" />
        <Autocomplete
          value={value}
          onValueChange={setValue}
          unstyled={args.unstyled}
        >
          <AutocompleteTrigger asChild>
            <Input
              unstyled={args.unstyled}
              className="bg-surface"
              placeholder={"Search for a framework"}
              endIcon={<ChevronDownIcon />}
            />
          </AutocompleteTrigger>
          <AutocompleteContent
            className=""
            emptyMessage="No Frameworks Found"
            loading={false}
          >
            <ScrollArea className="flex max-h-60 flex-col overflow-y-auto">
              <AutocompleteGroup>
                {FRAMEWORKS2.map((framework) => (
                  <AutocompleteItem key={framework} value={framework}>
                    {framework}
                  </AutocompleteItem>
                ))}
              </AutocompleteGroup>
            </ScrollArea>
          </AutocompleteContent>
        </Autocomplete>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <DialogClose>Cancel</DialogClose>
          <DialogClose unstyled asChild>
            <Button>Add User</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export const Default = {
  render: (args: AutocompleteProps) => <AutocompleteTemplate {...args} />,
}

export const WithScrollArea = {
  render: (args: AutocompleteProps) => <AutocompleteWithScrollArea {...args} />,
}

export const WithDialog = {
  render: (args: AutocompleteProps) => <AutoCompleteWithDialog {...args} />,
}
