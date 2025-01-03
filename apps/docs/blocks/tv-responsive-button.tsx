import { TVResponsiveButton } from "./components/responsive-button"

const TVResponsiveButtonExample = () => {
  return (
    <div className="flex size-full items-center justify-center">
      {/* screen size indicator */}
      <div className="text-muted-foreground absolute right-4 top-4 text-small">
        <p className="block sm:hidden">initial</p>
        <p className="hidden sm:block md:hidden">sm</p>
        <p className="hidden md:block lg:hidden">md</p>
        <p className="hidden lg:block xl:hidden">lg</p>
        <p className="hidden xl:block">xl</p>
      </div>

      <TVResponsiveButton
        size={{
          initial: "icon",
          sm: "md",
          md: "lg",
          lg: "lg",
        }}
        variant="filled"
        color="primary"
        radius="md"
      >
        <span className="hidden sm:block">Button</span>
        <span className="block sm:hidden">B</span>
      </TVResponsiveButton>
    </div>
  )
}

export default TVResponsiveButtonExample
