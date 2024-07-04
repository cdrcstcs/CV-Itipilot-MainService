import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../../components/ui/form";
import { Search } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useEffect } from "react";
const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }) => {
  const form = useForm({
    defaultValues: {
      searchQuery,
    },
  });
  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);
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
        className={"flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 border-red-600"}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-red-600 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none text-blue-500 font-semibold font-serif shadow-none text-xl focus-visible:ring-0" 
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          onClick={handleReset}
          type="button"
          variant="outline"
          className="rounded-full bg-red-600"
        >
          Reset
        </Button>
        <Button type="submit" className="rounded-full bg-blue-500">
          Search
        </Button>
      </form>
    </Form>
  );
};
export default SearchBar;
