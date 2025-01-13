import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
    removeItem: () => void;
    index: number;
}

const MenuItemInput = ({ removeItem, index }: Props) => {
    const { control } = useFormContext()


    return (
        <div className="flex flex-row gap-2 items-end">
            <FormField control={control} name={`menuItems.${index}.name`} render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        Name
                    </FormLabel>
                    <FormMessage />
                    <Input {...field} placeholder="Cheese Pizza" className="bg-white" />
                </FormItem>
            )} />


            <FormField control={control} name={`menuItems.${index}.price`} render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        Price
                    </FormLabel>
                    <FormMessage />

                    <Input {...field} placeholder="100" className="bg-white" />
                </FormItem>
            )} />

            <Button type="button" className="bg-red-600" onClick={removeItem}>Delete</Button>
        </div>
    )

}

export default MenuItemInput;