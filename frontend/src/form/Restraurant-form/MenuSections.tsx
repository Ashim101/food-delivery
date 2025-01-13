import { useFieldArray, useFormContext } from "react-hook-form";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import MenuItemInput from "./MenuItemInput";
import { Button } from "@/components/ui/button";


const MenuSections = () => {

    const { control } = useFormContext()
    const { fields, append, remove } = useFieldArray(
        {
            control,
            name: "menuItems"
        }
    )
    return (
        <div className="space-y-2">
            <h2 className="text-2xl font-bold">Menu Items</h2>
            <FormDescription>
                Create your Menu and give each item a name and price.
            </FormDescription>

            <FormField control={control} name="menuItems" render={({ field }) => (
                <FormItem>
                    <div className="flex flex-col gap-2">
                        {
                            fields.map((_, index) => (
                                <MenuItemInput index={index} removeItem={() => remove(index)} />
                            ))
                        }
                    </div>

                </FormItem>
            )} />
            <Button onClick={() => append({ name: "", price: "" })} type="button">
                Add item
            </Button>
        </div>
    )
}



export default MenuSections