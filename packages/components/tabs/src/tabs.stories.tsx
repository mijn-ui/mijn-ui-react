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
        <TabsTrigger
          className="h-10 data-[state=active]:shadow-sm"
          value="account"
        >
          Account
        </TabsTrigger>
        <TabsTrigger
          className="h-10 data-[state=active]:shadow-sm"
          value="password"
        >
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
            <Input
              id="name"
              className="bg-card"
              classNames={{
                label: "bg-card peer-focus:bg-card",
              }}
              label="Name"
              defaultValue="Pedro Duarte"
            />
            <Input
              id="username"
              className="bg-card"
              classNames={{
                label: "bg-card peer-focus:bg-card",
              }}
              label="Username"
              defaultValue="@peduarte"
            />
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
            <Input
              id="current"
              classNames={{ label: "bg-surface" }}
              label="Current password"
              type="password"
            />
            <Input
              id="new"
              classNames={{ label: "bg-surface" }}
              label="New password"
              type="password"
            />
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
        <TabsTrigger
          className="h-10 data-[state=active]:shadow-sm"
          value="account"
        >
          Account
        </TabsTrigger>
        <TabsTrigger
          className="h-10 data-[state=active]:shadow-sm"
          value="password"
          disabled
        >
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
            <Input
              id="name"
              classNames={{ label: "bg-surface" }}
              label="Name"
              defaultValue="Pedro Duarte"
            />
            <Input
              id="username"
              classNames={{ label: "bg-surface" }}
              label="Username"
              defaultValue="@peduarte"
            />
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
            <Input
              id="current"
              classNames={{ label: "bg-surface" }}
              label="Current password"
              type="password"
            />
            <Input
              id="new"
              classNames={{ label: "bg-surface" }}
              label="New password"
              type="password"
            />
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
        <TabsTrigger
          className="data-[state=active]:bg-accent h-10 data-[state=active]:shadow-sm"
          value="account"
        >
          Account
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-accent h-10 data-[state=active]:shadow-sm"
          value="password"
        >
          Password
        </TabsTrigger>
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
              classNames={{
                label: "bg-surface",
              }}
              placeholder="Name"
              defaultValue="Pedro Duarte"
              unstyled={args.unstyled}
            />
            <Input
              id="username"
              className="w-full py-1 indent-2"
              classNames={{
                label: "bg-surface",
              }}
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
              classNames={{
                label: "bg-surface",
              }}
              placeholder="Current password"
              type="password"
              unstyled={args.unstyled}
            />
            <Input
              id="new"
              className="w-full py-1 indent-2"
              classNames={{
                label: "bg-surface",
              }}
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
