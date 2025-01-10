import { useGetMyUser, useUpdateMyUser } from "@/apis/MyUserApi"
import UserProfileForm from "@/form/user-profile-form/UserProfileForm"

const UserProfilepage = () => {
    const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser()
    const { userProfileData, isError, isLoading: isGetLoading } = useGetMyUser()
    if (isGetLoading) {
        return (
            <h2>Loading...</h2>
        )
    }
    if (isError || !userProfileData) {
        return (
            <h2>User not found.</h2>
        )
    }
    return (
        <UserProfileForm userProfileData={userProfileData} isLoading={isUpdateLoading} onSave={updateUser} />

    )
}

export default UserProfilepage