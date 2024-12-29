import Loading from "@/app/loading"
import { Blocks } from "@/blocks"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import React from "react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    name: string
  }>
}): Promise<Metadata> {
  const { name } = await params
  const block = Blocks[name]

  if (!block) {
    return {}
  }

  const { title, description } = block

  return {
    title,
    description,
  }
}

export const generateStaticParams = () => {
  return Object.values(Blocks).map((block) => ({ name: block.name }))
}

const BlockPage = async ({
  params,
}: {
  params: Promise<{
    name: string
  }>
}) => {
  const { name } = await params
  const Component = getBlockComponent(name)

  if (!Component) {
    return notFound()
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
      <React.Suspense fallback={<Loading />}>
        <Component />
      </React.Suspense>
    </div>
  )
}

const getBlockComponent = (name: string) => Blocks[name]?.component

export default BlockPage
