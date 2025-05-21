"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import { CommandDialog, CommandInput } from "@/components/ui/command";
import { SearchRules } from "./SearchRules";
import { CommandRoot } from "./CommandRoot";

export function SearchCommandDialog() {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const [mode, setMode] = useState<"root" | "rules">("root");
	const [rules, setRules] = useState<
		{
			slug: string;
			title: string;
			description: string;
			tags: string[];
			content: string;
		}[]
	>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	// Load all rules once
	useEffect(() => {
		fetch("/api/rules")
			.then((res) => res.json())
			.then((data) => setRules(data))
			.catch((err) => console.error("Failed to load rules:", err));
	}, []);

	const filteredRules = useMemo(
		() =>
			searchQuery
				? rules.filter(
						(rule) =>
							rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
							rule.content.toLowerCase().includes(searchQuery.toLowerCase()),
					)
				: rules,
		[searchQuery, rules],
	);

	useEffect(() => {
		if (mode === "rules") {
			setSelectedIndex(0);
		}
	}, [mode]);

	useEffect(() => {
		if (selectedIndex >= filteredRules.length) {
			setSelectedIndex(0);
		}
	}, [filteredRules, selectedIndex]);

	// Handle arrow keys, Enter, and Escape in rules mode
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (mode !== "rules" || filteredRules.length === 0) return;
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setSelectedIndex((i) => (i + 1) % filteredRules.length);
				break;
			case "ArrowUp":
				e.preventDefault();
				setSelectedIndex(
					(i) => (i - 1 + filteredRules.length) % filteredRules.length,
				);
				break;
			case "Enter":
				e.preventDefault();
				const rule = filteredRules[selectedIndex];
				setOpen(false);
				setMode("root");
				setSelectedIndex(0);
				const tag = rule.tags[0] || "";
				router.push(`/rules/${tag}/${rule.slug}`);
				break;
			case "Escape":
				e.preventDefault();
				setMode("root");
				break;
		}
	};

	const handleOpenChange = (value: boolean) => {
		if (!value && mode === "rules") {
			setMode("root");
		} else {
			setOpen(value);
			if (value) setMode("root");
		}
	};

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<>
			<span className="text-sm text-muted-foreground h-fit">
				Press{" "}
				<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
					<span className="text-xs">⌘</span>K
				</kbd>
			</span>
			<CommandDialog open={open} onOpenChange={handleOpenChange}>
				<CommandInput
					placeholder="Type a command or search..."
					value={searchQuery}
					onValueChange={(val) => setSearchQuery(val)}
					onKeyDown={handleKeyDown}
					autoFocus
				/>
				{mode === "rules" ? (
					<SearchRules
						searchQuery={searchQuery}
						selectedIndex={selectedIndex}
						setSelectedIndex={setSelectedIndex}
					/>
				) : (
					<CommandRoot setMode={setMode} />
				)}
			</CommandDialog>
		</>
	);
}
