import { useCreateMyRestraurant } from "@/apis/ManageRestraurantApi"
import RestaurantForm from "@/form/Restraurant-form/RestraurantForm"
import { toast } from "sonner"

const RestraurantPage = () => {
    const { createRestraurant, error, isLoading, isSuccess } = useCreateMyRestraurant()
    if (error) {
        toast.error("Restraurant update failed")
    }
    if (isSuccess) {
        toast.success("Restraurant updated successfully")
    }
    return (
        <RestaurantForm isLoading={isLoading} onSave={createRestraurant} />
    )
}

export default RestraurantPage