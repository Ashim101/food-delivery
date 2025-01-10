import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

    // useEffect(() => {
    //     form.reset(restaurantData);
    // }, [restaurantData, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className="bg-gray-50 md:p-10 rounded-lg space-y-4">
                <div>
                    <h2 className="text-2xl font-bold">Restaurant Profile Form</h2>
                </div>
                <FormDescription>
                    View and change your Restaurant Information here
                </FormDescription>

                <FormField control={form.control} name="restaurantName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Restaurant Name</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="country" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                <FormField control={form.control} name="deliveryPrice" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Delivery Price</FormLabel>
                        <FormControl>
                            <Input {...field} type="number" className="bg-white" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="estimatedDeliveryTime" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Estimated Delivery Time (minutes)</FormLabel>
                        <FormControl>
                            <Input {...field} type="number" className="bg-white" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />



                <FormField control={form.control} name="cuisines" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Cuisines</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />



            </form>
        </Form>
    );
}

export default RestaurantForm;
