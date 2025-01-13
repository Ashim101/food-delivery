import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { cuisineList } from "@/configs/restraurant-options-cuisines";
import { useFormContext } from "react-hook-form";
import CuisineCheckBox from "./CuisineCheckBox";

const CuisineSection = () => {

    const { control } = useFormContext()
    return (
        <div className="space-y-2">
            <h2 className="text-2xl font-bold">Cuisines</h2>
            <FormDescription>
                Select the cuisines that your restraurant serves.
            </FormDescription>

            <FormField control={control} name="cuisines" render={({ field }) => (
                <FormItem>
                    <div className="grid md:grid-cols-5">
                        {
                            cuisineList.map((cuisineItem) => (
                                <CuisineCheckBox field={field} cuisine={cuisineItem} />
                            ))
                        }
                    </div>

                </FormItem>
            )} />

        </div>
    )

}

export default CuisineSection;