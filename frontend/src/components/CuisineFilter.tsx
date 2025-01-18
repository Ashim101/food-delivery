import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Label } from "./ui/label";
import { cuisineList } from "@/configs/restraurant-options-cuisines";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  isExpanded: boolean;
  selectedCuisine: string[];
  onChange: (cuisines: string[]) => void;
  onExpandClick: () => void;
};

const CuisineFilter = ({
  isExpanded,
  onChange,
  selectedCuisine,
  onExpandClick,
}: Props) => {
  const handleCuisineReset = () => {
    onChange([]);
  };

  const handleCuisineChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;
    const newCuisinesList = isChecked
      ? [...selectedCuisine, clickedCuisine]
      : selectedCuisine.filter((cuisine) => cuisine !== clickedCuisine);
    onChange(newCuisinesList);
  };
  return (
    <>
      <div className="flex justify-between items-center px2">
        <div className="text-base font-semibold mb-2">Filter by Cuisines</div>
        <div
          onClick={handleCuisineReset}
          className="text-sm underline text-blue-500 cursor-pointer"
        >
          Reset Filters
        </div>
      </div>

      <div className="flex flex-col space-y-2 ">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine: string) => {
            const isSelected = selectedCuisine.includes(cuisine);
            return (
              <div className="flex ">
                <input
                  type="checkbox"
                  className="hidden"
                  id={`cuisine_${cuisine}`}
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisineChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`rounded-full px-4 flex py-2 text-sm font-semibold flex-1 cursor-pointer ${
                    isSelected
                      ? "text-green-600 border border-green-600"
                      : "border border-slate-400"
                  }`}
                >
                  {isSelected && <Check />}
                  {cuisine}
                </Label>
              </div>
            );
          })}
        <Button onClick={onExpandClick} variant="link" className="flex-1">
          {isExpanded ? (
            <span className="flex justify-center">
              <ChevronUp />
            </span>
          ) : (
            <ChevronDown />
          )}
        </Button>
      </div>
    </>
  );
};

export default CuisineFilter;
