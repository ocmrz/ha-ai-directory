"use client"

import * as React from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  Search,
  User,
  ScrollText,
  FileCheck2,
  Blocks,
} from "lucide-react"
import { useRouter } from 'next/navigation'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function SearchCommandDialog() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  // Mode: 'root' for main suggestions, 'rules' for in-dialog rule search
  const [mode, setMode] = React.useState<'root' | 'rules'>('root')
  const [rules, setRules] = React.useState<{ slug: string; title: string; description: string; tags: string[]; content: string }[]>([])
  const [searchQuery, setSearchQuery] = React.useState<string>('')

  // Load all rules once
  React.useEffect(() => {
    fetch('/api/rules')
      .then((res) => res.json())
      .then((data) => setRules(data))
      .catch((err) => console.error('Failed to load rules:', err))
  }, [])

  // Compute filtered rules based on query
  const filteredRules = React.useMemo(
    () =>
      searchQuery
        ? rules.filter(
            (rule) =>
              rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              rule.content.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : rules,
    [searchQuery, rules]
  )

  // Handle dialog open/close, intercept ESC in rules mode to go back
  const handleOpenChange = (value: boolean) => {
    if (!value && mode === 'rules') {
      setMode('root')
    } else {
      setOpen(value)
      if (value) setMode('root')
    }
  }

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        {mode === 'rules' ? (
          <CommandInput
            placeholder="Search Rules..."
            value={searchQuery}
            onValueChange={(val) => setSearchQuery(val)}
            autoFocus
          />
        ) : (
          <CommandInput placeholder="Type a command or search..." />
        )}
        <CommandList>
          {mode === 'root' ? (
            <>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem onSelect={() => setMode('rules')}>
                  <FileCheck2 />
                  <span>Search Rules</span>
                </CommandItem>
                <CommandItem>
                  <ScrollText />
                  <span>Search <span className="font-mono">llms.txt</span></span>
                </CommandItem>
                <CommandItem>
                  <Blocks />
                  <span>Search MCPs</span>
                </CommandItem>
              </CommandGroup>
            </>
          ) : (
            <>
              <CommandItem onSelect={() => setMode('root')}>
                <span>← Back</span>
              </CommandItem>
              <CommandSeparator />
              {filteredRules.length > 0 ? (
                <CommandGroup heading="Rules">
                  {filteredRules.map((rule) => {
                    const tag = rule.tags[0] || ''
                    const href = `/rules/${tag}/${rule.slug}`
                    return (
                      <CommandItem
                        key={rule.slug}
                        onSelect={() => {
                          setOpen(false)
                          setMode('root')
                          router.push(href)
                        }}
                      >
                        <span>{rule.title}</span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              ) : (
                <CommandEmpty>No rules found.</CommandEmpty>
              )}
            </>
          )}
          {/* <CommandSeparator /> */}
          {/* <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup> */}
        </CommandList>
      </CommandDialog>
    </>
  )
}
