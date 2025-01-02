const Footer = () => {
  return (
    <footer className={"flex w-full items-center justify-center border-t py-4"}>
      <div className="flex w-full max-w-screen-lg flex-col items-center justify-between gap-2 px-5 py-2 sm:flex-row">
        <p className="bg-gradient-to-br from-main-text to-muted-text bg-clip-text text-tiny font-medium tracking-tight text-transparent sm:text-small">
          All Right Reserved By MijnUI.
        </p>
      </div>
    </footer>
  )
}

export { Footer }
