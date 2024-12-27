import Loading from "@/app/loading"
import fs from "fs"
import { notFound } from "next/navigation"
import path from "path"
import React, { Suspense } from "react"

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
    const Block = React.lazy(() => import(`@/blocks/${name}`))

    return (
      <div className="h-screen w-screen overflow-hidden">
        <Suspense fallback={<Loading />}>
          <Block />
        </Suspense>
      </div>
    )
  } catch (error) {
    console.error("Block not found:", error)
    notFound() // If using app router
    // return <div>Block not found</div>; // For pages router
  }
}

export default BlockPage
