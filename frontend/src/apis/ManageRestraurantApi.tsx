import { Restraurant } from "@/types"
import { useAuth0 } from "@auth0/auth0-react"
// import { Restraurant } from "../types"
import { useMutation } from "react-query"
const baseUrl = import.meta.env.VITE_API_BASE_URL



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



