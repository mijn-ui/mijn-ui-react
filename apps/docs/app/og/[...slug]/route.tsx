import { readFileSync } from "fs"
import { generateOGImage } from "fumadocs-ui/og"
import { metadataImage } from "@/lib/metadata-image"
import Logo from "@/app/components/logo"

const font = readFileSync("./app/og/[...slug]/Geist-Regular.ttf")
const fontBold = readFileSync("./app/og/[...slug]/Geist-Bold.ttf")

export const GET = metadataImage.createAPI((page) => {
  return generateOGImage({
    title: page.data.title,
    icon: <Logo width={60} height={60} />,

    description: page.data.description,
    site: "MijnUI",
    primaryTextColor: "rgb(255,255,255)",
    primaryColor: "rgba(249,115,22,0.5)",
    fonts: [
      {
        name: "Geist",
        data: font,
        weight: 400,
      },
      {
        name: "Geist",
        data: fontBold,
        weight: 600,
      },
    ],
  })
})

export function generateStaticParams() {
  return metadataImage.generateParams()
}
