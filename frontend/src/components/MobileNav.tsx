import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"

const MobileNav = () => {
    return (
        <div>
            <Sheet>
                <SheetTrigger>
                    <Menu className="text-orange-500" />
                </SheetTrigger>
                <SheetContent className="space-y-3 w-2/5">
                    <SheetTitle>
                        <span>Welcome to the MernEats.com!</span>
                    </SheetTitle>
                    <Separator />
                    <SheetDescription className="flex">
                        <Button className="bg-orange-500 flex-1 font-bold" >Login</Button>
                    </SheetDescription>
                </SheetContent>

            </Sheet>

        </div>
    )
}

export default MobileNav