import { notFound } from "next/navigation"
import { blocks } from "@/app/source"
import Alert from "@/app/components/mdx-alert"
import NavigationCard from "@/app/components/navigation-card"
import { Step, Steps } from "fumadocs-ui/components/steps"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import defaultMdxComponents from "fumadocs-ui/mdx"
import { metadataImage } from "@/lib/metadata-image"
import { BlockViewer } from "@/app/components/block-viewer"

export default async function Blocks(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = blocks.getPage(params.slug)

  if (!page) notFound()

  const MDX = page.data.body

  return (
    <article className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col gap-6 px-4 py-10 md:px-8 md:py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold md:text-4xl md:font-extrabold">
          {page.data.title}
        </h1>
        <p className="text-lg text-fd-muted-foreground">
          {page.data.description}
        </p>
      </div>
      <hr />
      <div className="prose">
        <MDX
          components={{
            ...defaultMdxComponents,
            Tabs,
            Tab,
            BlockViewer,
            Alert,
            Steps,
            Step,
          }}
        />
      </div>

      <div className="mt-4">
        <NavigationCard
          previous={page.data.footer.previous}
          next={page.data.footer.next}
        />
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  return blocks.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = blocks.getPage(params.slug)
  if (!page) notFound()

  return metadataImage.withImage(page.slugs, {
    title: page.data.title,
    description: page.data.description,
  })
}
