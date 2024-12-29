import { Blocks } from "@/blocks"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type BlockPageProps = {
  params: Promise<{
    name: string
  }>
}

export async function generateMetadata({
  params,
}: BlockPageProps): Promise<Metadata> {
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

export const generateStaticParams = async () => {
  return Object.values(Blocks).map((block) => block.name)
}

const BlockPage = async ({ params }: BlockPageProps) => {
  const { name } = await params
  const Component = getBlockComponent(name)

  if (!Component) {
    return notFound()
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Component />
    </div>
  )
}

const getBlockComponent = (name: string) => Blocks[name]?.component

export default BlockPage
