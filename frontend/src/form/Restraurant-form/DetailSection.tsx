import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

const DetailSection = () => {
    const { control } = useFormContext()
    return (
        <div className="space-y-2">
            <div >
                <h2 className="text-2xl font-bold">Details</h2>
                <FormDescription>
                    Enter the detail about your restraurant.
                </FormDescription>

            </div>

            <FormField control={control} name="restraurantName" render={({ field }) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-white" />
                    </FormControl>
                </FormItem>

            )} />
            <div className="flex gap-4">

                <FormField control={control} name="city" render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>
                    </FormItem>

                )} />

                <FormField control={control} name="country" render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>
                    </FormItem>

                )} />

            </div>


            <FormField control={control} name="delieveryPrice" render={({ field }) => (
                <FormItem className="max-w-[25%]">
                    <FormLabel>Delievery Price (RS)</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-white" />
                    </FormControl>
                </FormItem>

            )} />

            <FormField control={control} name="estimatedDelieveryTime" render={({ field }) => (
                <FormItem className="max-w-[25%]">
                    <FormLabel>Estimated Delievery Time (minutes)</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-white" />
                    </FormControl>
                </FormItem>

            )} />




        </div>
    )
}

export default DetailSection