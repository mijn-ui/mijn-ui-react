import Link from "next/link"
import { notFound } from "next/navigation"
import { File, Files, Folder } from "fumadocs-ui/components/files"
import { Step, Steps } from "fumadocs-ui/components/steps"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import defaultMdxComponents from "fumadocs-ui/mdx"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page"
import { ExternalLink } from "lucide-react"
import { metadataImage } from "@/lib/metadata-image"
import Alert from "@/app/components/mdx/alert"
import ComponentPreview from "@/app/components/mdx/component-preview"
import { MijnUITabs, MijnUITabsContent } from "@/app/components/mdx/tabs"
import { source } from "@/app/source"

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) notFound()

  const MDX = page.data.body

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      lastUpdate={page.data.lastModified}
      editOnGithub={{
        owner: "mijn-ui",
        repo: "mijn-ui-react",
        sha: "main",
        path: `apps/docs/content/docs/${page.file.path}`,
      }}
    >
      <div className="flex w-full flex-col items-baseline justify-between gap-3 sm:flex-row">
        <DocsTitle className="md:text-4xl md:font-extrabold">
          {page.data.title}
        </DocsTitle>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          {page.data.docs && (
            <Link
              target="_blank"
              className="flex items-center gap-1 text-small text-foreground/80 underline hover:text-primary"
              href={page.data.docs}
            >
              <ExternalLink />
              Docs
            </Link>
          )}
          {page.data.apiReference && (
            <Link
              target="_blank"
              className="flex items-center gap-1 text-small text-foreground/80 underline hover:text-primary"
              href={page.data.apiReference}
            >
              <ExternalLink />
              Api Reference
            </Link>
          )}
          {page.data.styleSource && (
            <Link
              target="_blank"
              className="flex items-center gap-1 text-small text-foreground/80 underline hover:text-primary"
              href={page.data.styleSource}
            >
              <ExternalLink />
              Style Source
            </Link>
          )}
        </div>
      </div>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            Steps,
            Step,
            Tabs,
            Tab,
            File,
            Files,
            Folder,
            Alert,
            MijnUITabs,
            MijnUITabsContent,
            ComponentPreview,
          }}
        />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return metadataImage.withImage(page.slugs, {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      url: `/react/docs/${page.slugs.join("/")}`,
    },
  })
}
