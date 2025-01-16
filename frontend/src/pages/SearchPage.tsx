import { useSearchRestraurant } from "@/apis/Restraurantapi"
import SearchInfo from "@/components/SearchInfo"
import SearchResultCard from "@/components/SearchResultCard"
import { useParams } from "react-router-dom"

const SearchPage = () => {
    const {city}=useParams()
    const{results,isLoading}=useSearchRestraurant(city)
    if(!results?.data ||!city)
    {
        return <span>Restraurant not found.</span>
    }
    if(isLoading)
    {
        return <p>Loadig..</p>
    }
    
  return (
    <div className="grid lg:grid-cols-[250px,1fr] gap-5 ">
        <div id="cuisines-lists">
            insert your cuisine lists.

        </div>

        <div id="main-content" className="flex flex-col gap-5">

            <SearchInfo city={city} total={results.pagination.total} />

            {results.data.map((restraurant)=>(   <SearchResultCard restraurant={restraurant}/>))}

         


        </div>

    </div>
  )
}

export default SearchPage