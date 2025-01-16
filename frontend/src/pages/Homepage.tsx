import landing from "../assets/landing.png"
import appDownload from "../assets/appDownload.png"
import SearchBar, { searchQuery } from "@/components/SearchBar"
import { useNavigate } from "react-router-dom"
const Homepage = () => {

    const navigate=useNavigate()
    const handleSearch=(search:searchQuery)=>{
        navigate(`/search/${search.searchQuery}`)

    }
    return (
        <div className="flex flex-col gap-12 w-11/12 mx-auto">
            <div className="flex flex-col text-center shadow-md py-8 gap-5 rounded-lg -mt-16 bg-white px-0">
                <h1 className="text-5xl text-orange-600 tracking-tight font-bold">Tuck into the takeaway today</h1>
                <span className="text-xl ">Food is just a click away!</span>
                <SearchBar placeholder="Search by restraurant name or cuisines" onSubmit={handleSearch}/>
  
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <div>
                    <img src={landing} alt="landing image" />
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-3">
                    <span className="font-bold text-3xl tracking-tighter">Order takeaway even faster!</span>
                    <span >Download MernEats.com for faster ordering and personalised recommendations</span>
                    <img src={appDownload} alt="" />

                </div>

            </div>
        </div>
    )
}

export default Homepage