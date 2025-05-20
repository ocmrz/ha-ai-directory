"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useState } from "react";

interface RulesCardProps {
	title: string;
	description: string;
	content: string;
	tags: string[];
}

function RulesCardWithDrawer(props: RulesCardProps) {
	return (
		<Drawer>
			<div className="h-fit w-fit group relative">
				<DrawerTrigger className="absolute h-full w-full z-10" />
				<RulesCard {...props} />
			</div>
			<RulesDrawer {...props} />
		</Drawer>
	)
}

function RulesCard(props: RulesCardProps) {
	return (
		<Card className="h-fit">
			<CardHeader>
				<CardTitle>{props.title}</CardTitle>
				<CardDescription>{props.description}</CardDescription>
			</CardHeader>
			<CardContent className="h-fit relative" >
				<div className="font-mono bg-secondary text-xs px-3 py-2 h-96 overflow-auto">
					<p className="line-clamp-[23] opacity-50 group-hover:opacity-100">{props.content}</p>
				</div>
			</CardContent>
			<CardFooter>
				<p>{props.tags.join(", ")}</p>
			</CardFooter>
		</Card>
	)
}

interface RulesDrawerProps {
	title: string;
	description: string;
	content: string;
	tags: string[];
}


function RulesDrawer(props: RulesDrawerProps) {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.content); 
      setIsCopied(true);
			toast("Rule has been copied!")
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

	return (
		<DrawerContent >
			<DrawerHeader>
				<DrawerTitle>{props.title}</DrawerTitle>
				<DrawerDescription>{props.description}</DrawerDescription>
				<Button onClick={handleCopy}>{isCopied ? "Copied" : "Copy"}</Button>
			</DrawerHeader>
			<hr />
			<DrawerFooter>
				<div className="font-mono bg-secondary text-xs px-3 py-2 h-[550px] overflow-auto whitespace-pre-wrap">
					<p className="overflow-y-scroll">{props.content}</p>
				</div>
			</DrawerFooter>
		</DrawerContent>
	)
}

export {
	RulesCardWithDrawer
}
