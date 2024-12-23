"use client"

import * as React from "react"
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteGroup,
  AutocompleteItem,
  AutocompleteTrigger,
} from "@mijn-ui/react-autocomplete"
import { Button } from "@mijn-ui/react-button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@mijn-ui/react-dialog"
import { Input } from "@mijn-ui/react-input"
import { ScrollArea } from "@mijn-ui/react-scroll-area"
import { LuChevronsUpDown } from "react-icons/lu"

const FRAMEWORKS = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
  "WordPress",
  "Express.js",
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

const AutocompleteWithDialog = () => {
  const [value, setValue] = React.useState("Next.js")

  return (
    <Dialog>
      <DialogTrigger>Add User</DialogTrigger>
      <DialogContent className="">
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <DialogTitle>User Information</DialogTitle>
        </div>
        <Input placeholder="Username" />
        <Input placeholder="Email" />
        <Autocomplete value={value} onValueChange={setValue}>
          <AutocompleteTrigger asChild>
            <Input
              className="bg-surface"
              placeholder={"Search for a framework"}
              endIcon={<LuChevronsUpDown />}
            />
          </AutocompleteTrigger>
          <AutocompleteContent
            className=""
            emptyMessage="No Frameworks Found"
            loading={false}
          >
            <ScrollArea className="flex max-h-60 flex-col overflow-y-auto">
              <AutocompleteGroup>
                {FRAMEWORKS.map((framework) => (
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

export default AutocompleteWithDialog
