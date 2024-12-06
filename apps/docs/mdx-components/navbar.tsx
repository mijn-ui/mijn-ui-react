"use client"

import { useState } from "react"
import Link from "next/link"
import { TopRightRadialGradient } from "@/app/components/decorators/gradient-bg"
import Logo from "@/app/components/logo"
import ThemeToggler from "@/app/components/theme-toggler"
import ClickAwayListener from "@/app/utils/click-away-listener"
import { Badge } from "@mijn-ui/react-badge"
import { Button, buttonStyles } from "@mijn-ui/react-button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@mijn-ui/react-collapsible"
import { Separator } from "@mijn-ui/react-separator"
import { cn } from "@mijn-ui/react-utilities/shared"
import { SidebarTrigger } from "fumadocs-core/sidebar"
import { useSearchContext, useSidebar } from "fumadocs-ui/provider"
import {
  LuChevronDown,
  LuExternalLink,
  LuGithub,
  LuMenu,
  LuSearch,
  LuX,
} from "react-icons/lu"
import { usePathname } from "next/navigation"

const PAGES = [
  {
    title: "Documentation",
    href: "/docs",
  },
  {
    title: "Blocks",
    href: "/blocks",
  },
]

const GITHUB_URL = "https://github.com/mijn-ui/mijn-ui-react"

const Navbar = () => {
  const { setOpenSearch } = useSearchContext()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { open: isSidebarOpen } = useSidebar()
  const pathname = usePathname()

  // Check if the pathname starts with '/docs'
  const isDocsPage = /^\/docs/.test(pathname)

  const renderPages = PAGES.map((page) => (
    <Link
      key={page.title}
      className="text-muted-text hover:text-secondary-text text-sm"
      href={page.href}
    >
      {page.title}
    </Link>
  ))

  const renderSidebarTrigger = (
    <SidebarTrigger
      className={cn(
        buttonStyles({
          variant: "text",
          color: "accent",
          size: "icon",
          className: "-me-2 md:hidden",
        }),
      )}
    >
      {isSidebarOpen ? <LuX /> : <LuMenu />}
    </SidebarTrigger>
  )

  return (
    <header className="sticky inset-x-0 top-0 z-50 h-[var(--navbar-height)] w-full flex-col items-center justify-center border-b bg-transparent backdrop-blur-md md:flex">
      <nav className="flex w-full items-center justify-between px-5 py-2">
        <div className="flex items-center gap-4">
          <Link href={"/"} className="flex  items-center gap-2 font-bold">
            <Logo className="fill-fd-foreground size-5 items-center" />
            MijnUI
          </Link>
          <Badge className="bg-primary/20 text-primary hover:bg-primary/20">
            v0.0.1
          </Badge>

          <div className="hidden gap-4 md:flex">{renderPages}</div>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-2 md:flex">
          <Button
            onClick={() => setOpenSearch(true)}
            color={"accent"}
            variant={"outline"}
            size={"sm"}
            className="gap-2"
          >
            <LuSearch />
            <span className="text-muted-text inline-block">Search...</span>
            <div className="ml-4 inline-flex h-5 gap-1 rounded-full border px-2 py-px">
              <kbd className="text-xxs">Ctrl+</kbd>
              <kbd className="text-xxs">K</kbd>
            </div>
          </Button>

          <Button color={"accent"} size={"sm"} className="border px-2" asChild>
            <Link target="_blank" href={GITHUB_URL}>
              <LuGithub size={18} />
            </Link>
          </Button>

          <ThemeToggler />
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setOpenSearch(true)}
            className="text-muted-text hover:text-secondary-text inline-flex size-8 items-center justify-center transition duration-200"
          >
            <LuSearch />
          </button>

          <ClickAwayListener onClickAway={() => setDropdownOpen(false)}>
            <Collapsible open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <CollapsibleTrigger className="text-muted-text hover:text-secondary-text flex size-8 items-center justify-center transition duration-200">
                <LuChevronDown className="text-lg" />
              </CollapsibleTrigger>
              <CollapsibleContent className="top-[calc(var(--navbar-height)] bg-surface data-[state=closed]:animate-collapsible-close data-[state=open]:animate-collapsible-open absolute inset-x-0 mt-2 overflow-hidden text-sm transition-[height]">
                <div className="relative flex w-full flex-col items-start justify-between space-y-2 px-4 py-2">
                  <div className="flex w-fit flex-col gap-2">{renderPages}</div>
                  <Separator />

                  <div className="flex w-full items-center justify-between">
                    <Link
                      className="text-muted-text hover:text-secondary-text inline-flex items-center gap-2"
                      target="_blank"
                      href={GITHUB_URL}
                    >
                      Github <LuExternalLink />
                    </Link>
                    <ThemeToggler />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </ClickAwayListener>

          {isDocsPage && renderSidebarTrigger}
        </div>
      </nav>

      <TopRightRadialGradient />
    </header>
  )
}

export default Navbar
