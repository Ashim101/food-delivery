import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  searchQuery: z.string().min(1, "Search query params is required"),
});

export type searchQuery = z.infer<typeof formSchema>;

type Props = {
  placeholder: string;
  onSubmit: (searchQuery: searchQuery) => void;
  onReset?: () => void;
  searchQuery?: string;
};

const SearchBar = ({ placeholder, onSubmit, onReset, searchQuery }: Props) => {
  const form = useForm<searchQuery>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: searchQuery || "",
    },
  });

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center justify-between  gap-4 border-2 rounded-full p-3 mx-5 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className=" ml-1 hidden md:block text-orange-500"
        />

        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  className="border-none shadow-none focus-visible:ring-0 text-xl md:text-2xl"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {form.formState.isDirty && (
          <Button
            onClick={handleReset}
            type="button"
            variant="outline"
            className="rounded-full"
          >
            {" "}
            Clear
          </Button>
        )}

        <Button type="submit" className="bg-orange-500 rounded-full">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
