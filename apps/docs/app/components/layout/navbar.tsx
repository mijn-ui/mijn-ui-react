"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@mijn-ui/react"
import { Button } from "@mijn-ui/react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@mijn-ui/react"
import { Separator } from "@mijn-ui/react"
import { buttonStyles, cn } from "@mijn-ui/react"
import { SidebarTrigger } from "fumadocs-core/sidebar"
import { useSearchContext, useSidebar } from "fumadocs-ui/provider"
import { ChevronDown, ExternalLink, Menu, Search, X } from "lucide-react"
import { TopRightRadialGradient } from "@/app/components/decorators/gradient-bg"
import Logo from "@/app/components/logo"
import ThemeToggler from "@/app/components/theme-toggler"
import ClickAwayListener from "@/app/components/utils/click-away-listener"
import { Icons } from "../icons"

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
      className="text-small text-muted-foreground hover:text-secondary"
      href={page.href}
    >
      {page.title}
    </Link>
  ))

  const renderSidebarTrigger = (
    <SidebarTrigger
      className={cn(
        buttonStyles({
          variant: "ghost",
          iconOnly: true,
          className: "-me-2 md:hidden",
        }).base(),
      )}
    >
      {isSidebarOpen ? <X /> : <Menu />}
    </SidebarTrigger>
  )

  return (
    <header className="sticky inset-x-0 top-0 z-40 h-[var(--navbar-height)] w-full flex-col items-center justify-center border-b bg-transparent backdrop-blur-md md:flex">
      <nav className="flex w-full items-center justify-between px-5 py-2">
        <div className="flex items-center gap-4">
          <Link href={"/"} className="flex  items-center gap-2 font-bold">
            <Logo className="size-5 items-center fill-fd-foreground" />
            MijnUI
          </Link>
          <Badge
            size="xs"
            className="bg-primary/20 text-primary hover:bg-primary/20 hover:text-primary"
          >
            v0.0.1
          </Badge>

          <div className="hidden gap-4 md:flex">{renderPages}</div>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-2 md:flex">
          <Button
            onClick={() => setOpenSearch(true)}
            variant={"outlined"}
            size={"sm"}
            className="gap-2"
          >
            <Search />
            <span className="inline-block text-muted-foreground">
              Search...
            </span>
            <div className="ml-4 inline-flex h-5 gap-1 rounded-full border-small px-2 py-px">
              <kbd className="text-xxs">Ctrl+</kbd>
              <kbd className="text-xxs">K</kbd>
            </div>
          </Button>

          <Button size={"sm"} className="px-2" asChild>
            <Link target="_blank" href={GITHUB_URL}>
              <Icons.github className="text-lg" />
            </Link>
          </Button>

          <ThemeToggler />
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setOpenSearch(true)}
            className="inline-flex size-8 items-center justify-center text-muted-foreground transition duration-200 hover:text-secondary"
          >
            <Search />
          </button>

          <ClickAwayListener onClickAway={() => setDropdownOpen(false)}>
            <Collapsible open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <CollapsibleTrigger className="flex size-8 items-center justify-center text-muted-foreground transition duration-200 hover:text-secondary">
                <ChevronDown className="text-large" />
              </CollapsibleTrigger>
              <CollapsibleContent className="top-[calc(var(--navbar-height)] absolute inset-x-0 mt-2 overflow-hidden bg-card text-small transition-[height] data-[state=closed]:animate-collapsible-close data-[state=open]:animate-collapsible-open">
                <div className="relative flex w-full flex-col items-start justify-between space-y-2 px-4 py-2">
                  <div className="flex w-fit flex-col gap-2">{renderPages}</div>
                  <Separator />

                  <div className="flex w-full items-center justify-between">
                    <Link
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-secondary"
                      target="_blank"
                      href={GITHUB_URL}
                    >
                      Github <ExternalLink />
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

export { Navbar }
