import { SearchCommandDialog } from "../command/SearchCommandDialog";
import { NavMenu } from "./NavMenu";

function NavBar() {
	return (
		<nav className="flex flex-row items-center justify-between p-4 border-b">
			<div className="font-mono">
				<a href="/">directory</a>
			</div>
			<div className="flex items-center justify-between">
				<NavMenu />
				<div className="w-6"></div>
				<SearchCommandDialog />
			</div>
		</nav>
	);
}

export { NavBar };
