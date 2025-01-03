"use client"

import { useState } from "react"

import { LuSearch } from "react-icons/lu"

import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteGroup,
  AutocompleteItem,
  AutocompleteTrigger,
} from "@mijn-ui/react-autocomplete"
import { Input } from "@mijn-ui/react-input"
import { ScrollArea } from "@mijn-ui/react-scroll-area"

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

const AutocompleteWithScrollArea = () => {
  const [value, setValue] = useState("AdonisJS")

  return (
    <Autocomplete value={value} onValueChange={setValue}>
      <AutocompleteTrigger asChild>
        <Input
          placeholder={"Search for a framework"}
          startIcon={<LuSearch />}
        />
      </AutocompleteTrigger>
      <AutocompleteContent emptyMessage="No Frameworks Found" loading={false}>
        <ScrollArea className="flex max-h-52 flex-col overflow-y-auto">
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
  )
}

export default AutocompleteWithScrollArea
