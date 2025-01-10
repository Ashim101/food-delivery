import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth0 } from "@auth0/auth0-react"
import { CircleUserRound } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"

const UsernameMenu = () => {
    const { user, logout } = useAuth0()
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-2 font-bold hover:text-orange-500">
                    <CircleUserRound className="text-orange-500" />
                    {user?.name}
                </DropdownMenuTrigger>
                <DropdownMenuContent  >
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link to="/user-profile">
                            Profile
                        </Link>

                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link to="/restraurant">
                            My Restraurant
                        </Link>

                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <Button onClick={() => logout()} className="bg-orange-500">
                            Logout
                        </Button>
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default UsernameMenu