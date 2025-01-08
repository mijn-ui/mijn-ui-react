import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@mijn-ui/react"

const AvatarGroupExample = () => {
  return (
    <AvatarGroup className="flex items-center justify-center" max={3}>
      <Avatar size="sm">
        <AvatarImage src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww" />
        <AvatarFallback>Anthony</AvatarFallback>
      </Avatar>

      <Avatar size="sm">
        <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww" />
        <AvatarFallback>Susie</AvatarFallback>
      </Avatar>

      <Avatar size="sm">
        <AvatarImage src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" />
        <AvatarFallback>John Doe</AvatarFallback>
      </Avatar>

      <Avatar size="sm">
        <AvatarImage src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" />
        <AvatarFallback>John Doe</AvatarFallback>
      </Avatar>

      <Avatar size="sm">
        <AvatarImage src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" />
        <AvatarFallback>John Doe</AvatarFallback>
      </Avatar>

      <Avatar size="sm">
        <AvatarImage src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" />
        <AvatarFallback>John Doe</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  )
}

export default AvatarGroupExample
