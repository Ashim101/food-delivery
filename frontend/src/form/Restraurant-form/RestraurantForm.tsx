// import LoadingButton from "@/components/LoadingButton";
// import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailSection from "./DetailSection";
import { Form } from "@/components/ui/form";
import CuisineSection from "./CuisineSection";
import { Separator } from "@/components/ui/separator";
import MenuSections from "./MenuSections";

// Define the Zod validation schema for restaurant data
const formSchema = z.object({
    restaurantName: z.string().min(1, "Restaurant Name is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    deliveryPrice: z.number().min(0, "Delivery price must be a positive number"),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "Estimated delievery time is required",
        invalid_type_error: "Must be a valid number"
    }),
    cuisines: z.array(z.string()).min(1, "At least one cuisine is required"),
    menuItems: z.array(
        z.object({
            name: z.string().min(1, "Menu item name is required"),
            price: z.coerce.number().min(0, "Menu item price must be a positive number")
        })
    ).min(1, "At least one menu item is required"),
    image: z.instanceof(File).refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "Image must be smaller than 5MB",
    }), // Optional field, adjust as needed
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (restaurantData: RestaurantFormData) => void;
    isLoading: Boolean;

}

const RestaurantForm = ({ onSave, isLoading }: Props) => {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }],

        }
    });


    const onSubmit = (formDataJson: RestaurantFormData) => {
        onSave(formDataJson);


    }

    if (isLoading) {
        console.log("Loading")
    }
    // useEffect(() => {
    //     form.reset(restaurantData);
    // }, [restaurantData, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-50 p-10 rounded-lg space-y-4">
                <DetailSection />
                <Separator />
                <CuisineSection />
                <Separator />
                <MenuSections />



            </form>
        </Form>
    );
}

export default RestaurantForm;
