"use client"

import { Button, ButtonProps } from "@mijn-ui/react"
import { useCopyToClipboard } from "@/app/hooks/use-copy-to-clipboard"

const CopyButton = ({
  content,
  ...props
}: ButtonProps & { content: string }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard()

  return (
    <Button
      data-copied={isCopied}
      onClick={() => copyToClipboard(content)}
      {...props}
    />
  )
}

export default CopyButton
