"use client"

import { useState } from "react"
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteItem,
  AutocompleteTrigger,
} from "@mijn-ui/react-autocomplete"
import { Input } from "@mijn-ui/react-input"
import { LuSearch } from "react-icons/lu"

const FRAMEWORKS = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
  "WordPress",
  "Express.js",
]

const AutocompleteExample = () => {
  const [value, setValue] = useState("SvelteKit")

  return (
    <Autocomplete value={value} onValueChange={setValue}>
      <AutocompleteTrigger asChild>
        <Input
          placeholder={"Search for a framework"}
          startIcon={<LuSearch />}
        />
      </AutocompleteTrigger>
      <AutocompleteContent emptyMessage="No Frameworks Found" loading={false}>
        {FRAMEWORKS.map((framework) => (
          <AutocompleteItem key={framework} value={framework}>
            {framework}
          </AutocompleteItem>
        ))}
      </AutocompleteContent>
    </Autocomplete>
  )
}

export default AutocompleteExample
