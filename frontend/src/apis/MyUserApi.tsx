import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query"

const baseUrl = import.meta.env.VITE_API_BASE_URL

type CreateUserRequest = {
    auth0Id: String,
    email: String
}

export const useCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()
    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accesstoken = await getAccessTokenSilently()
        console.log(accesstoken)
        const response = await fetch(`${baseUrl}/api/my/user`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accesstoken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),

        });
        if (!response.ok) {
            throw new Error("Failed to create user")
        }



    }

    const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createMyUserRequest)
    return { createUser, isLoading, isError, isSuccess }
}

type UpdateUserRequest = {
    name: String,
    addressLine1: String,
    country: String,
    city: String,
}

export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()
    const updateMyUserRequest = async (formData: UpdateUserRequest) => {
        const accesstoken = await getAccessTokenSilently()
        const response = await fetch(`${baseUrl}/api/my/user`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accesstoken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),

        });
        if (!response.ok) {
            throw new Error("Failed to update user")
        }



    }

    const { mutateAsync: updateUser, isLoading, isError, isSuccess } = useMutation(updateMyUserRequest)
    return { updateUser, isLoading, isError, isSuccess }
}