import { Button } from "@mijn-ui/react-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@mijn-ui/react-card"
import { Input } from "@mijn-ui/react-input"
import type { Meta, StoryObj } from "@storybook/react"
import { Tabs, TabsContent, TabsList, TabsProps, TabsTrigger } from "./tabs"

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  args: {
    unstyled: false,
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

const TabsTemplate = (args: TabsProps) => {
  return (
    <Tabs defaultValue="account" className="w-[400px]" {...args}>
      <TabsList className="grid h-fit w-full grid-cols-2">
        <TabsTrigger value="account">
          <AccountIcon />
          Account
        </TabsTrigger>
        <TabsTrigger value="password">
          <LockIcon />
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card className="border-none bg-transparent shadow-none">
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re
              done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input id="name" label="Name" defaultValue="Pedro Duarte" />
            <Input id="username" label="Username" defaultValue="@peduarte" />
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card className="border-none bg-transparent shadow-none">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged
              out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input id="current" label="Current password" type="password" />
            <Input id="new" label="New password" type="password" />
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

const TabsDisabled = (args: TabsProps) => {
  return (
    <Tabs defaultValue="account" className="w-[400px]" {...args}>
      <TabsList className="grid h-fit w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password" disabled>
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re
              done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input id="name" label="Name" defaultValue="Pedro Duarte" />
            <Input id="username" label="Username" defaultValue="@peduarte" />
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged
              out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input id="current" label="Current password" type="password" />
            <Input id="new" label="New password" type="password" />
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

const TabsUnstyled = (args: TabsProps) => {
  return (
    <Tabs defaultValue="account" className="w-[400px]" {...args}>
      <TabsList className="grid h-fit w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card
          className="bg-accent relative flex w-full flex-col gap-3 p-4"
          unstyled={args.unstyled}
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re
              done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              id="name"
              className="w-full py-1 indent-2"
              placeholder="Name"
              defaultValue="Pedro Duarte"
              unstyled={args.unstyled}
            />
            <Input
              id="username"
              className="w-full py-1 indent-2"
              placeholder="Username"
              defaultValue="@peduarte"
              unstyled={args.unstyled}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="bg-muted flex gap-2 px-4 py-2 disabled:pointer-events-none disabled:opacity-80 disabled:brightness-75"
              unstyled={args.unstyled}
            >
              Save changes
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card
          className="bg-accent relative flex w-full flex-col gap-3 p-4"
          unstyled={args.unstyled}
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged
              out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              id="current"
              className="w-full py-1 indent-2"
              placeholder="Current password"
              type="password"
              unstyled={args.unstyled}
            />
            <Input
              id="new"
              className="w-full py-1 indent-2"
              placeholder="New password"
              type="password"
              unstyled={args.unstyled}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="bg-muted flex gap-2 px-4 py-2 disabled:pointer-events-none disabled:opacity-80 disabled:brightness-75"
              unstyled={args.unstyled}
            >
              Save password
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export const Default: Story = {
  render: TabsTemplate,
}

export const Disabled: Story = {
  render: TabsDisabled,
}

export const Unstyled: Story = {
  render: TabsUnstyled,
  args: {
    unstyled: true,
  },
}

const AccountIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="10.5"
      cy="10.0003"
      r="8.33333"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M6.75 14.1663C8.69308 12.1312 12.286 12.0354 14.25 14.1663M12.5792 7.91634C12.5792 9.06693 11.6452 9.99967 10.4929 9.99967C9.34071 9.99967 8.40664 9.06693 8.40664 7.91634C8.40664 6.76575 9.34071 5.83301 10.4929 5.83301C11.6452 5.83301 12.5792 6.76575 12.5792 7.91634Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

const LockIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5 13.7497V12.083"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M4.05655 15.704C4.24395 17.0958 5.39681 18.1863 6.79975 18.2508C7.98027 18.305 9.17946 18.3333 10.5 18.3333C11.8206 18.3333 13.0198 18.305 14.2003 18.2508C15.6033 18.1863 16.7561 17.0958 16.9435 15.704C17.0658 14.7956 17.1667 13.8647 17.1667 12.9167C17.1667 11.9686 17.0658 11.0378 16.9435 10.1294C16.7561 8.73752 15.6033 7.64707 14.2003 7.58258C13.0198 7.52831 11.8206 7.5 10.5 7.5C9.17946 7.5 7.98027 7.52831 6.79975 7.58258C5.39681 7.64707 4.24395 8.73752 4.05655 10.1294C3.93424 11.0378 3.83337 11.9686 3.83337 12.9167C3.83337 13.8647 3.93424 14.7956 4.05655 15.704Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M6.75 7.50033V5.41699C6.75 3.34592 8.42893 1.66699 10.5 1.66699C12.5711 1.66699 14.25 3.34592 14.25 5.41699V7.50033"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
