import { Avatar, AvatarFallback, AvatarImage } from "@mijn-ui/react"

const AvatarSizes = () => {
  return (
    <>
      <Avatar size="xs">
        <AvatarImage src="" alt="invalid-image" />
        <AvatarFallback>xs</AvatarFallback>
      </Avatar>

      <Avatar size="sm">
        <AvatarImage src="" alt="invalid-image" />
        <AvatarFallback>sm</AvatarFallback>
      </Avatar>

      <Avatar size="md">
        <AvatarImage src="" alt="invalid-image" />
        <AvatarFallback>md</AvatarFallback>
      </Avatar>

      <Avatar size="lg">
        <AvatarImage src="" alt="invalid-image" />
        <AvatarFallback>lg</AvatarFallback>
      </Avatar>

      <Avatar size="xl">
        <AvatarImage src="" alt="invalid-image" />
        <AvatarFallback>xl</AvatarFallback>
      </Avatar>

      <Avatar size="xxl">
        <AvatarImage src="" alt="invalid-image" />
        <AvatarFallback>xxl</AvatarFallback>
      </Avatar>
    </>
  )
}

export default AvatarSizes
