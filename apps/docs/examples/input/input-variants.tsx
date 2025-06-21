import { Input } from "@mijn-ui/react"

const InputVariants = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Filled / Default</p>
        <Input
          classNames={{ wrapper: "w-80" }}
          variant="filled"
          placeholder="Username..."
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Underline</p>
        <Input
          classNames={{ wrapper: "w-80" }}
          variant="underline"
          placeholder="Username..."
        />
      </div>
    </>
  )
}

export default InputVariants
