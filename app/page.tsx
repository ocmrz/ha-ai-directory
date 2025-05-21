import { HomeBento } from "@/components/home/BentoGrid";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex justify-center pt-24 w-screen">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<div className="flex gap-8">
					<div className="font-mono text-4xl">ai.directory</div>
					<div className="flex gap-4 items-center flex-col sm:flex-row">
						<Link
							className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
							href="/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Kickstart
						</Link>
						<a
							className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
							href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
							target="_blank"
							rel="noopener noreferrer"
						>
							Contribute
						</a>
					</div>
				</div>
				<HomeBento />
			</main>
			
		</div>
	);
}
