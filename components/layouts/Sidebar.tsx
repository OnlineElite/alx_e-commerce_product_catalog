import { categories } from "@/constants"
import { useState, useEffect } from "react"
import Button from "@/components/common/Button"
import { useDispatch, useSelector } from "react-redux"
import { setCategories, setPriceRange, clearAllFilters } from "@/store/slices/filterSlice"
import type { RootState } from "@/store/index"

const Sidebar: React.FC = () => {
  const dispatch = useDispatch()
  const { selectedCategories, priceRange } = useSelector((state: RootState) => state.filters)
  const [localPriceRange, setLocalPriceRange] = useState(priceRange[1])

  // Sync local price range with Redux state
  useEffect(() => {
    setLocalPriceRange(priceRange[1])
  }, [priceRange])

  const handleCategoryChange = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category]
    dispatch(setCategories(newCategories))
  }

  const handlePriceRangeChange = (value: number) => {
    setLocalPriceRange(value)
  }

  const handleApplyFilters = () => {
    dispatch(setPriceRange([0, localPriceRange]))
  }

  const handleClearFilters = () => {
    dispatch(clearAllFilters())
    setLocalPriceRange(1000)
  }

  return (
    <div className="bg-white rounded rounded-xl shadow-sm row-span-1 col-span-3 md:row-span-3 md:col-span-1 lg:row-span-3 lg:col-span-1">
      <div className="my-6 px-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">Categories</h3>
          <button 
            onClick={handleClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear All
          </button>
        </div>
        <div className="flex flex-row sm:flex-row md:flex-col lg:flex-col gap-2 flex-wrap">
          {categories.map((category, index) => (
            <span key={index} className="flex flex-row items-center gap-2">
              <input 
                type="checkbox" 
                className="scale-125"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <p className="text-sm"> {category} </p>
            </span>
          ))}
        </div>
        <hr className="border-t border-gray-200 w_full mx-auto my-4" />
      </div>
      <div className="my-6 px-4">
        <h3 className="text-lg font-bold mb-3">Price Range</h3>
        <div className="flex flex-col gap-2">
          <input
            type="range"
            id="price"
            min={0}
            max={1000}
            step={10}
            value={localPriceRange}
            onChange={(e) => handlePriceRangeChange(Number(e.target.value))}
            className="w-full"
          />
          <span className="flex flex-row items-center justify-between text-sm text-gray-500">
            <p>$0</p>
            <p>${localPriceRange}</p>
          </span>
        </div>
        <hr className="border-t border-gray-200 w_full mx-auto my-4" />
      </div>
      <div className="my-6 px-4 flex flex-col gap-2">
        <Button backColor="secondColor" title="Apply Filters" action={handleApplyFilters} />
        <Button backColor="gray" title="Clear Filters" action={handleClearFilters} />
      </div>
    </div>
  )
}

export default Sidebar
