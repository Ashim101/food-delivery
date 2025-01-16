import { RestraurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const useSearchRestraurant = (city?:string) => {
    const getSearchRestraurantRequest = async ():Promise<RestraurantSearchResponse>  => {
        const response = await fetch(`${baseUrl}/api/restraurant/search/${city}`, {
            method: "get",
        });


        if (!response.ok) {
            throw new Error("Failed to Get restraurant")
        }

        return response.json()



    }

    const { data: results, isLoading } = useQuery("fetchRestraurant", getSearchRestraurantRequest,
        {enabled:!!city}
    )

    return { results, isLoading }
}