import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestraurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const useSearchRestraurant = (searchState:SearchState,city?:string) => {
    const getSearchRestraurantRequest = async ():Promise<RestraurantSearchResponse>  => {

        const params=new URLSearchParams()
        params.set("searchQuery",searchState.searchQuery)
        params.set("page",searchState.page.toString())
        params.set("selectedCuisines",searchState.selectedCuisines.join(","))
        params.set("sortOption",searchState.sortOption)
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


export const useGetRestraurant = (restaurantId?:string) => {
    const getRestraurantRequest = async ():Promise<Restaurant>  => {

       
        const response = await fetch(`${baseUrl}/api/restraurant/${restaurantId}`, {
            method: "get",
        });


        if (!response.ok) {
            throw new Error("Failed to get restraurant")
        }

        return response.json()



    }

    const { data: restaurant, isLoading } = useQuery("fetchRestraurantbyId", getRestraurantRequest,
        {enabled:!!restaurantId}
    )

    return { restaurant, isLoading }
}