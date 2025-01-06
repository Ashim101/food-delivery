import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="border-b-2 border-b-orange-500 py-6">
            <div className="container mx-auto flex justify-between item center ">
                <Link to="/" className="text-3xl text-orange-500 font-bold tracking-tight">
                    Merneats</Link>

            </div>

        </div>
    )
}

export default Header