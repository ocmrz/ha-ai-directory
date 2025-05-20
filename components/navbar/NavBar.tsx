import { ModeToggle } from "../ModeToggle";
import { NavMenu } from "./NavMenu";

function NavBar() {
    return (
        <nav className="flex flex-row align-middle justify-between p-4 pr-64">
            <div className="font-mono"><a href="/">directory</a></div>
            <NavMenu />
        </nav>
    )
}

export {
    NavBar
}