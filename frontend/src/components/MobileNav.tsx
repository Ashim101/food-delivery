import { CircleUserRound, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import MobilenavLink from "./MobilenavLink"

const MobileNav = () => {
    const { user, isAuthenticated, loginWithRedirect } = useAuth0()
    return (
        <div>
            <Sheet>
                <SheetTrigger>
                    <Menu className="text-orange-500" />
                </SheetTrigger>
                <SheetContent className="space-y-3 w-2/5">
                    <SheetTitle>
                        {isAuthenticated ? (<span className="flex gap-2"><CircleUserRound className="text-orange-500" />{user?.name}</span>) : (<span>Welcome to the MernEats.com!</span>
                        )}
                    </SheetTitle>
                    <Separator />
                    <SheetDescription className="flex">
                        {isAuthenticated ? <MobilenavLink /> : <Button onClick={() => loginWithRedirect()} className="bg-orange-500 flex-1 font-bold" >Login</Button>}
                    </SheetDescription>
                </SheetContent>

            </Sheet>

        </div>
    )
}

export default MobileNav