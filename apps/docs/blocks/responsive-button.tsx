import ResponsiveButton from "./components/responsive-button"

const ResponsiveButtonExample = () => {
  return (
    <div className="flex size-full items-center justify-center">
      {/* screen size indicator */}
      <div className="absolute right-4 top-4 text-sm text-muted-text">
        <p className="block sm:hidden">initial</p>
        <p className="hidden sm:block md:hidden">sm</p>
        <p className="hidden md:block lg:hidden">md</p>
        <p className="hidden lg:block xl:hidden">lg</p>
        <p className="hidden xl:block">xl</p>
      </div>

      <ResponsiveButton
        size={{
          initial: "icon",
          sm: "md",
          md: "lg",
          lg: "lg",
        }}
        variant="filled"
        color="primary"
        radius="md"
        className="inline-block min-w-0 truncate"
      >
        <span className="block truncate">Button</span>
      </ResponsiveButton>
    </div>
  )
}

export default ResponsiveButtonExample
