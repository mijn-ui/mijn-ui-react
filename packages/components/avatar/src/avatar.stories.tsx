import type { Meta, StoryObj } from "@storybook/react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup as MijnUIAvatarGroup,
} from "./avatar"
import { AvatarProps } from "@radix-ui/react-avatar"

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  args: {
    size: "md",
    unstyled: false,
  },
  argTypes: {
    size: {
      type: "string",
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "xxl"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

const AvatarTemplate = (args: AvatarProps) => {
  return (
    <Avatar {...args}>
      <AvatarImage
        src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"
        alt="anthony"
      />
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
  )
}

const AvatarSizes = (args: AvatarProps) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar {...args}>
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
    </div>
  )
}

const AvatarGroup = (args: AvatarProps) => {
  return (
    <MijnUIAvatarGroup max={3}>
      <Avatar {...args}>
        <AvatarImage src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww" />
        <AvatarFallback>Anthony</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww" />
        <AvatarFallback>Susie</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarImage src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" />
        <AvatarFallback>John Doe</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarImage src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" />
        <AvatarFallback>John Doe</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarImage src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" />
        <AvatarFallback>John Doe</AvatarFallback>
      </Avatar>

      <Avatar {...args}>
        <AvatarImage src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" />
        <AvatarFallback>John Doe</AvatarFallback>
      </Avatar>
    </MijnUIAvatarGroup>
  )
}

const AvatarUnstyled = (args: AvatarProps) => {
  return (
    <Avatar {...args}>
      <AvatarImage
        src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"
        alt="anthony"
        className="size-10 object-cover text-sm"
      />
      <AvatarFallback>xs</AvatarFallback>
    </Avatar>
  )
}

export const Default: Story = {
  render: AvatarTemplate,
}

export const Sizes: Story = {
  render: AvatarSizes,
  args: {
    size: "xs",
  },
}

export const Group: Story = {
  render: AvatarGroup,
}

export const Unstyled: Story = {
  render: AvatarUnstyled,
  args: {
    unstyled: true,
  },
}
