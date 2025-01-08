"use client"

import * as React from "react"
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteGroup,
  AutocompleteItem,
  AutocompleteTrigger,
} from "@mijn-ui/react"
import { Button } from "@mijn-ui/react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@mijn-ui/react"
import { Input } from "@mijn-ui/react"
import { ScrollArea } from "@mijn-ui/react"
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
      <DialogContent>
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <DialogTitle>User Information</DialogTitle>
        </div>
        <Input
          placeholder="Username"
          classNames={{
            input: "bg-card",
          }}
        />
        <Input
          placeholder="Email"
          classNames={{
            input: "bg-card",
          }}
        />
        <Autocomplete value={value} onValueChange={setValue}>
          <AutocompleteTrigger asChild>
            <Input
              classNames={{
                input: "bg-card",
              }}
              placeholder={"Search for a framework"}
              endIcon={<LuChevronsUpDown />}
            />
          </AutocompleteTrigger>
          <AutocompleteContent
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
