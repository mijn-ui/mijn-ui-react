import { Avatar, AvatarFallback, AvatarImage } from "@mijn-ui/react"

const AvatarExample = () => {
  return (
    <Avatar size="md">
      <AvatarImage
        src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"
        alt="anthony"
      />
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
  )
}

export default AvatarExample
