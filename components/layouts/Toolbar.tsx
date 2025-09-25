import { sortingOptions } from "@/constants"
import { useDispatch, useSelector } from "react-redux"
import { setSortOption } from "@/store/slices/filterSlice"
import type { RootState } from "@/store/index"

const Toolbar: React.FC = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((state: RootState) => state.products)
  const { selectedCategories, priceRange, searchQuery } = useSelector((state: RootState) => state.filters)

  // Calculate filtered products count (same logic as ProductList)
  const filteredProductsCount = items.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category.name)
    const priceMatch = Number(product.price) >= priceRange[0] && Number(product.price) <= priceRange[1]
    const searchMatch = searchQuery === '' || 
                      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    return categoryMatch && priceMatch && searchMatch
  }).length

  const handleSortChange = (option: string) => {
    dispatch(setSortOption(option))
  }

  return (
    <div className="bg-white rounded rounded-xl shadow-sm row-span-1 col-span-3 md:col-span-2 md:row-span-1 lg:col-span-3 flex flex-row items-center justify-between px-4 py-2 ">
      <p>Showing {filteredProductsCount} of {items.length} products</p>
      <select
        name="sorting"
        id="sorting"
        className="border border-gray-300 rounded p-1"
        onChange={(e) => handleSortChange(e.target.value)}
      >
        {sortingOptions.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Toolbar



/* import { sortingOptions } from "@/constants";

const Toolbar: React.FC = () => {
  return (
    <div className="bg-white rounded rounded-xl shadow-sm row-span-1 col-span-3 md:col-span-2 md:row-span-1 lg:col-span-3 flex flex-row items-center justify-between px-4 py-2 ">
      <p>Showing 12 of 48 products</p>
      <select
        name="sorting"
        id="sorting"
        className="border border-gray-300 rounded p-1"
      >
        {sortingOptions.map((option, index) => (
          <option value={option} key={index}>
            {" "}
            {option}{" "}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Toolbar; */
