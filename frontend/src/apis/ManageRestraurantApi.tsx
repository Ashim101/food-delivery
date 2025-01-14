import { Restraurant } from "@/types"
import { useAuth0 } from "@auth0/auth0-react"
// import { Restraurant } from "../types"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"
const baseUrl = import.meta.env.VITE_API_BASE_URL


export const useGetMyRestraurant = () => {
    const { getAccessTokenSilently } = useAuth0()
    const getMyRestraurantRequest = async (): Promise<Restraurant> => {
        const accesstoken = await getAccessTokenSilently()
        const response = await fetch(`${baseUrl}/api/my/restraurant`, {
            method: "get",
            headers: {
                Authorization: `Bearer ${accesstoken}`,
                "Content-Type": "application/json"
            },



        });


        if (!response.ok) {
            throw new Error("Failed to Get user")
        }

        return response.json()



    }

    const { data: RestraurantData, isLoading, isError, isSuccess, } = useQuery("fetchRestraurantData", getMyRestraurantRequest)

    return { RestraurantData, isLoading, isError, isSuccess }
}

export const useCreateMyRestraurant = () => {
    const { getAccessTokenSilently } = useAuth0()
    const createMyRestraurantRequest = async (restraurantFormData: FormData): Promise<Restraurant> => {
        const accesstoken = await getAccessTokenSilently()
        const response = await fetch(`${baseUrl}/api/my/restraurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accesstoken}`,
            },
            body: restraurantFormData,

        });
        if (!response.ok) {
            throw new Error("Failed to create user")
        }

        return response.json()


    }

    const { mutateAsync: createRestraurant, isLoading, error, isSuccess } = useMutation(createMyRestraurantRequest)
    return { createRestraurant, isLoading, error, isSuccess }
}

export const useUpdateMyRestraurant = () => {
    const { getAccessTokenSilently } = useAuth0()
    const updateMyRestraurantRequest = async (restraurantFormData: FormData): Promise<Restraurant> => {
        const accesstoken = await getAccessTokenSilently()
        const response = await fetch(`${baseUrl}/api/my/restraurant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accesstoken}`,
            },
            body: restraurantFormData,

        });
        if (!response.ok) {
            throw new Error("Failed to create user")
        }

        return response.json()


    }

    const { mutateAsync: updateRestraurant, isLoading, error, isSuccess } = useMutation(updateMyRestraurantRequest)
    if (error) {
        toast.error("Unable to update")
    }
    if (isSuccess) {
        toast.success("Updated successfully")
    }
    return { updateRestraurant, isLoading }
}

