import { SearchState } from "@/pages/SearchPage";
import { RestraurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const useSearchRestraurant = (searchState:SearchState,city?:string) => {
    const getSearchRestraurantRequest = async ():Promise<RestraurantSearchResponse>  => {

        const params=new URLSearchParams()
        params.set("searchQuery",searchState.searchQuery)
        params.set("page",searchState.page.toString())
        const response = await fetch(`${baseUrl}/api/restraurant/search/${city}?${params}`, {
            method: "get",
        });


        if (!response.ok) {
            throw new Error("Failed to Get restraurant")
        }

        return response.json()



    }

    const { data: results, isLoading } = useQuery(["fetchRestraurant",searchState], getSearchRestraurantRequest,
        {enabled:!!city}
    )

    return { results, isLoading }
}