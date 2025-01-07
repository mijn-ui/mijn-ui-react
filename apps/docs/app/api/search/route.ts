import { createFromSource } from "fumadocs-core/search/server"
import { source } from "@/app/source"

export const { GET } = createFromSource(source, (page) => ({
  title: page.data.title,
  description: page.data.description,
  url: page.url,
  id: page.url,
  structuredData: page.data.structuredData,
}))
