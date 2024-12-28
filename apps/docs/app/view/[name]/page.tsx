import Loading from "@/app/loading"
import fs from "fs"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import path from "path"

type BlockPageProps = {
  params: Promise<{
    name: string
  }>
}

export const generateStaticParams = async () => {
  const blocksDir = path.join(process.cwd(), "blocks")
  const blockFolders = fs.readdirSync(blocksDir)

  return blockFolders.map((name) => ({ name }))
}

const BlockPage = async ({ params }: BlockPageProps) => {
  const { name } = await params

  try {
    const Block = dynamic(() => import(`@/blocks/${name}`), {
      loading: () => <Loading />,
    })

    return (
      <div className="h-screen w-screen overflow-hidden">
        <Block />
      </div>
    )
  } catch (error) {
    console.error("Block not found:", error)
    notFound()
  }
}

export default BlockPage
