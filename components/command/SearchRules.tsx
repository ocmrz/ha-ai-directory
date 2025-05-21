import { CommandInput } from "@/components/ui/command"
import { useState, useEffect, useMemo } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

type Rule = {
	slug: string;
	title: string;
	description: string;
	tags: string[];
	content: string;
}

interface SearchRulesProps {
	searchQuery: string;
	selectedIndex: number;
	setSelectedIndex: (index: number) => void;
}
function SearchRules(props: SearchRulesProps) {
  const [rules, setRules] = useState<Rule[]>([])
	// const [selectedIndex, setSelectedIndex] = useState<number>(0)


  useEffect(() => {
    fetch('/api/rules')
      .then((res) => res.json())
      .then((data) => setRules(data))
      .catch((err) => console.error('Failed to load rules:', err))
  }, [])
  // Compute filtered rules based on query
  const filteredRules = useMemo(
    () =>
      props.searchQuery
        ? rules.filter(
            (rule) =>
              rule.title.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
              rule.content.toLowerCase().includes(props.searchQuery.toLowerCase())
          )
        : rules,
    [props.searchQuery, rules]
  )

	return (
		<div className="grid grid-cols-[250px_minmax(0,_1fr)] overflow-hidden sm:min-h-[700px]">
			<div className="overflow-y-scroll">
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					{filteredRules.map((rule, idx) => (
						<CommandItem key={rule.slug} onSelect={() => props.setSelectedIndex(idx)}>
							<span>{rule.title}</span>
						</CommandItem>
					))}
				</CommandGroup>
			</div>
			<div className="min-w-0">
				{filteredRules[props.selectedIndex] ? (
					<>
						<h3 className="text-lg font-semibold">
							{filteredRules[props.selectedIndex].title}
						</h3>
						<p className="text-sm text-muted-foreground">
							{filteredRules[props.selectedIndex].description}
						</p>
						<pre className="mt-2 text-xs whitespace-pre-wrap max-h-[200px] overflow-auto">
							{filteredRules[props.selectedIndex].content.slice(0, 200) + '...'}
						</pre>
					</>
				) : (
					<p className="text-sm text-muted-foreground">
						No rule selected.
					</p>
				)}
			</div>
		</div>
	)
}

export {
	SearchRules,
}