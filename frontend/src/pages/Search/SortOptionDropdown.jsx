import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
const SORT_OPTIONS = [
  {
    label: "Best match",
    value: "bestMatch",
  },
  {
    label: "Earliest Event Start Time",
    value: "earliest",
  },
  {
    label: "Latest Event Start Time",
    value: "latest",
  },
];
const SortOptionDropdown = ({ onChange, sortOption }) => {
  const selectedSortLabel = SORT_OPTIONS.find((option) => option.value === sortOption)?.label || SORT_OPTIONS[0].label;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button variant="outline" className="w-full text-red-600 rounded-3xl">
          Sort by: {selectedSortLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" font-bold">
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            className="cursor-pointer mt-1 text-red-600 rounded"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default SortOptionDropdown;
