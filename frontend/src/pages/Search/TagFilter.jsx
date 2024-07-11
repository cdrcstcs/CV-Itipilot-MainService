import {tagList} from '../../config/attraction-options-config';
import { Label } from '@/components/ui/label';
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@radix-ui/themes";
const TagFilter = ({onChange, selectedTags, isExpanded, onExpandedClick}) => {
  const handleTagsChange = (event) => {
    const clickedTag = event.target.value;
    const isChecked = event.target.checked;
    const newTagsList = isChecked ? [...selectedTags, clickedTag] : selectedTags.filter((Tag) => Tag !== clickedTag);
    onChange(newTagsList);
  };
  const handleTagsReset = () => onChange([]);
  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-red-600 text-md font-semibold mb-2">Filter By Attraction Tag</div>
        <div
          onClick={handleTagsReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        {tagList.slice(0, isExpanded ? tagList.length : 7).map((Tag) => {
            const isSelected = selectedTags.includes(Tag);
            return (
              <div className="flex">
                <input
                  id={`Tag_${Tag}`}
                  type="checkbox"
                  className="hidden"
                  value={Tag}
                  checked={isSelected}
                  onChange={handleTagsChange}
                />
                <Label
                  htmlFor={`Tag_${Tag}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm bg-white text-black rounded-full px-4 py-2 font-semibold ${isSelected ? "border border-green-600 text-green-600": "border border-slate-300"}`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {Tag}
                </Label>
              </div>
            );
          })}
        <Button
          onClick={onExpandedClick}
          variant="link"
          className="mt-4 flex-1"
        >
          {isExpanded ? (
            <span className=" text-white flex flex-row items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className=" flex  text-white flex-row items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};
export default TagFilter;
