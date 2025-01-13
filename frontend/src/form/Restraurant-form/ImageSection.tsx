import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

const ImageSection = () => {
    const { control } = useFormContext()
    return (
        <div className="space-y-2 ">
            <h2 className="font-bold text-2xl">Image</h2>
            <FormDescription>
                Upload a image that will appear your restraurant list. Uploading multiple images will replace the last one.
            </FormDescription>
            <div className="flex flex-col gap-8 w-[50%]">
                <FormField control={control} name="image" render={({ field }) => (
                    <FormItem >
                        <FormControl>
                            <Input type="file" accept=".jpg, .jpeg, .png" className="bg-white" onChange={(event) => {
                                field.onChange(event.target.files ? event.target.files[0] : null)
                            }} />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )} />
            </div>

        </div>
    )
}

export default ImageSection