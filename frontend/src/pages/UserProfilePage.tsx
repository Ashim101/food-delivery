import { useUpdateMyUser } from "@/apis/MyUserApi"
import UserProfileForm from "@/form/user-profile-form/UserProfileForm"

const UserProfilepage = () => {
    const { updateUser, isLoading } = useUpdateMyUser()
    return (
        <UserProfileForm isLoading={isLoading} onSave={updateUser} />

    )
}

export default UserProfilepage