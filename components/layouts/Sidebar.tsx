import { categories, productVariants } from "@/constants";
import { useState } from "react"
import Button from "@/components/common/Button"

const Sidebar: React.FC = () => {
  const [priceRange, setPriceRange] = useState(1000);

  const colorClasses: Record<string, string> = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  black: "bg-black",
  yellow: "bg-yellow-500",
  gray: "bg-gray-500",
};

  const handlePriceRange = (value: string) => {
    setPriceRange(Number(value));
  };

  const handleApplyFilters = () => {
    console.log("filters applyed");
  };

  return (
    <div className="bg-white rounded rounded-xl shadow-sm row-span-1 col-span-3 md:row-span-1 md:col-span-3 lg:row-span-3 lg:col-span-1">
      <div className="my-4 px-4">
        <h3 className="text-lg font-bold mb-1">Categories</h3>
        <div className="flex flex-row sm:flex-row md:flex-row lg:flex-col gap-2 flex-wrap">
          {categories.map((categorie, index) => (
            <span key={index} className="flex flex-row items-center gap-1">
              <input type="checkbox" />
              <p className="text-sm"> {categorie} </p>
            </span>
          ))}
        </div>
        <hr className="border-t border-gray-200 w_full mx-auto my-4" />
      </div>
      <div className="my-4 px-4">
        <h3 className="text-lg font-bold mb-1">Price Range</h3>
        <div className="flex flex-col gap-2">
          <input
            type="range"
            id="price"
            min={0}
            max={1000}
            step={1}
            value={priceRange}
            onChange={(e) => handlePriceRange(e.target.value)}
          />
          <span className="flex flex-row items-center justify-between text-sm text-gray-500">
            <p>$0</p>
            <p>${priceRange}</p>
          </span>
        </div>
        <hr className="border-t border-gray-200 w_full mx-auto my-4" />
      </div>
      <div className="my-4 px-4">
        <h3 className="text-lg font-bold mb-1">Product Variants</h3>
        <div className="flex flex-row  gap-2 flex-wrap">
          {productVariants.map((color, index) => (           
            <span key={index} className={`${colorClasses[color]} w-6 h-6 rounded-full`}> </span>         
          ))}
        </div>
        <hr className="border-t border-gray-200 w_full mx-auto my-4" />
      </div>
      <div className="my-4 px-4 ">
        <Button backColor="secondColor" title="Apply Filters" action={handleApplyFilters} />
      </div>
    </div>
  );
};

export default Sidebar;
