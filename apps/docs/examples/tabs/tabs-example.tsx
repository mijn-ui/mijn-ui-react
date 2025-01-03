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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@mijn-ui/react-tabs"

const TabsExample = () => {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid h-fit w-full grid-cols-2">
        <TabsTrigger
          className="h-10 data-[state=active]:shadow-small"
          value="account"
        >
          Account
        </TabsTrigger>
        <TabsTrigger
          className="h-10 data-[state=active]:shadow-small"
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
              classNames={{
                input: "bg-card",
                label: "bg-card peer-focus:bg-card",
              }}
              label="Name"
              defaultValue="Pedro Duarte"
            />
            <Input
              id="username"
              classNames={{
                input: "bg-card",
                label: "bg-card peer-focus:bg-card",
              }}
              label="Username"
              defaultValue="@peduarte"
            />
          </CardContent>
          <CardFooter>
            <Button color="primary">Save changes</Button>
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
              classNames={{
                input: "bg-card",
                label: "bg-card peer-focus:bg-card",
              }}
              label="Current password"
              type="password"
            />

            <Input
              id="new"
              classNames={{
                input: "bg-card",
                label: "bg-card peer-focus:bg-card",
              }}
              label="New password"
              type="password"
            />
          </CardContent>
          <CardFooter>
            <Button color="primary">Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default TabsExample
