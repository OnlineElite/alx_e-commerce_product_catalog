import Toolbar from "@/components/layouts/Toolbar"
import Sidebar from "@/components/layouts/Sidebar"
import ProductList from "@/components/layouts/ProductList"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Home() {

  const style = "bg-white rounded text-center py-1 border border-gray-300"

  return (
    <main className="bg-backColor grid grid-cols  md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto py-6 px-4">
      <Sidebar/>
      <Toolbar/>
      <ProductList/>
      <div className="row-span-1 col-span-3 md:col-span-3 md:row-span-1 lg:col-span-3 flex flex-row items-center justify-center px-4 py-2 gap-2">
        <span className={`${style} px-1`} ><ChevronLeft size={24}/></span>
        <span className={`${style} px-3`}>1</span>
        <span className={`${style} px-3`}>2</span>
        <span className={`${style} px-3`}>3</span>
        <span className={`${style} px-3`}>4</span>
        <span className={`${style} px-1`}><ChevronRight  size={24}/></span>
    </div>
    </main>
  )
}

{/* 
const ShopPage: React.FC = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<number>(1000);
    const [sortOption, setSortOption] = useState<string>("Sort by: Default");

    return (
        <div className="grid grid-cols-3 gap-4">
            <Sidebar
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
            />
            <div className="col-span-2">
                <Toolbar sortOption={sortOption} setSortOption={setSortOption} />
                <ProductList
                    selectedCategories={selectedCategories}
                    priceRange={priceRange}
                    sortOption={sortOption}
                />
            </div>
        </div>
    );
};

 */}