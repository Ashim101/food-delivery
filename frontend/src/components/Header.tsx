import { Link } from "react-router-dom"
import MobileNav from "./MobileNav"

const Header = () => {
    return (
        <div className="border-b-2 border-b-orange-500 py-6">
            <div className=" mx-auto flex justify-around item center ">
                <Link to="/" className="text-3xl text-orange-500 font-bold tracking-tight">
                    Merneats</Link>

                <div className="md:hidden">

                    <MobileNav />
                </div>

            </div>

        </div>
    )
}

export default Header