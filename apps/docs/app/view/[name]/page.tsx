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

  // Read all entries (files and folders) in the blocks directory
  const entries = fs.readdirSync(blocksDir, { withFileTypes: true })

  // Filter for files only and exclude folders
  const blockFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx")) // Only .tsx files
    .map((file) => path.parse(file.name).name) // Get file names without extensions

  return blockFiles.map((name) => ({ name }))
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
