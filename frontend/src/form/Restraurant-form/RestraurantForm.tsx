import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailSection from "./DetailSection";
import { Form } from "@/components/ui/form";
import CuisineSection from "./CuisineSection";
import { Separator } from "@/components/ui/separator";
import MenuSections from "./MenuSections";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";

import { useEffect } from "react";

// Define the Zod validation schema for restaurant data
const formSchema = z
  .object({
    restaurantName: z.string().min(1, "Restaurant Name is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    deliveryPrice: z.coerce
      .number({
        required_error: "Delivery Price is required",
        invalid_type_error: "Must be a valid number",
      })
      .min(1, "Delivery price must be a positive number"),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "Estimated delivery time is required",
      invalid_type_error: "Must be a valid number",
    }),
    cuisines: z.array(z.string()).min(1, "At least one cuisine is required"),
    menuItems: z
      .array(
        z.object({
          name: z.string().min(1, "Menu item name is required"),
          price: z.coerce
            .number({
              required_error: "Delivery Price is required",
              invalid_type_error: "Must be a valid number",
            })
            .min(2, "Menu item price must be a positive number"),
        })
      )
      .min(3, "At least three menu items are required"),
    imageUrl: z.string().optional(),
    image: z.instanceof(File).optional(), // Optional field, adjust as needed
  })
  .refine(
    (data) => {
      return !!(data.image || data.imageUrl); // Return a boolean
    },
    {
      message: "Either image or imageURL is required",
      path: ["image"],
    }
  );

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantData: FormData) => Promise<Restaurant>;
  isLoading: boolean;
  restraurant?: Restaurant;
};

const RestaurantForm = ({ restraurant, onSave, isLoading }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [
        { name: "", price: 0 },
        { name: "", price: 0 },
        { name: "", price: 0 },
      ],
    },
  });

  useEffect(() => {
    if (!restraurant) {
      return;
    }
    form.reset(restraurant);
  }, [form, restraurant]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();
    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("deliveryPrice", formDataJson.deliveryPrice.toString());
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );

    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
    });

    if (formDataJson.image) {
      formData.append("image", formDataJson.image);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-gray-50 p-10 rounded-lg space-y-4"
      >
        <DetailSection />
        <Separator />
        <CuisineSection />
        <Separator />
        <MenuSections />
        <Separator />
        <ImageSection />

        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-orange-500">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default RestaurantForm;
