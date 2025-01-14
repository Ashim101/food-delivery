import { useCreateMyRestraurant, useGetMyRestraurant, useUpdateMyRestraurant } from "@/apis/ManageRestraurantApi"
import RestaurantForm from "@/form/Restraurant-form/RestraurantForm"
import { toast } from "sonner"

const RestraurantPage = () => {
    const { createRestraurant, error, isLoading: isCreateLoading, isSuccess: isCreateSuccess } = useCreateMyRestraurant()

    const { isLoading: isUpdateLoading, updateRestraurant } = useUpdateMyRestraurant()

    const { RestraurantData, isLoading: isGetLoading, } = useGetMyRestraurant()
    if (isGetLoading)
        return <h2>Loading...</h2>
    if (error) {
        toast.error("Restraurant update failed")
    }
    if (isCreateSuccess) {
        toast.success("Restraurant updated successfully")
    }
    const isEditing = !!RestraurantData
    console.log(isEditing)

    return (
        <RestaurantForm restraurant={RestraurantData} isLoading={isUpdateLoading || isCreateLoading} onSave={isEditing ? updateRestraurant : createRestraurant} />
    )
}

export default RestraurantPage