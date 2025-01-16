import { useSearchRestraurant } from "@/apis/Restraurantapi"
import { useParams } from "react-router-dom"

const SearchPage = () => {
    const {city}=useParams()
    const{results,isLoading}=useSearchRestraurant(city)
    if(isLoading)
    {
        return <p>Loadig..</p>
    }
  return (
    <div>SearchPage { city}: foundresults: {results?.data.map((restraurant)=>(restraurant.restraurantName))}</div>
  )
}

export default SearchPage