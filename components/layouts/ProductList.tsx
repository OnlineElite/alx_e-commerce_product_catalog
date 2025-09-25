//import { products } from "@/constants"
import Card from "@/components/common/Card"
import { ProductProps } from "@/interfaces"
import { LoaderCircle } from "lucide-react";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from "@/store/slices/productSlice"
import type { RootState, AppDispatch } from "@/store/index"

const ProductList: React.FC = () => {

    
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    if(loading) 
    return (
        <div className="absolute top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center bg-white/30 z-150">
        <p className="z-100 absolute text-black flex item-center justify-center"><LoaderCircle size={35} className="text-mainColor animate-spin"/></p>
        </div>
    )
    
    return(
        <div className="bg-white rounded rounded-xl shadow-sm row-span-1 col-span-3 md:col-span-2 md:row-span-1 lg:col-span-3 ">
            <div className="bg-backColor w-full h-full grid grid-cols sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(({id, name, category, price, images}) =>(
                    <Card key={id} id={id} name={name}  category={category} price={price} images={images} />
                ))}
            </div>
        </div>
    )
}

export default ProductList;

{/* 
const ProductList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading } = useSelector((state: RootState) => state.products);

    // Filters
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<number>(1000);
    const [sortOption, setSortOption] = useState<string>("Sort by: Default");

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    // Filtered products
    const filteredProducts = items
        .filter((product) => 
            (selectedCategories.length === 0 || selectedCategories.includes(product.category.name)) &&
            Number(product.price) <= priceRange
        )
        .sort((a, b) => {
            if (sortOption === "Price: Low to Hight") return Number(a.price) - Number(b.price);
            if (sortOption === "Price: Hight to Low") return Number(b.price) - Number(a.price);
            if (sortOption === "Name: A to Z") return a.name.localeCompare(b.name);
            if (sortOption === "Name: Z to A") return b.name.localeCompare(a.name);
            return 0;
        });

    return (
        <div className="bg-white rounded-xl shadow-sm row-span-1 col-span-3 md:col-span-2 md:row-span-1 lg:col-span-3">
            <div className="bg-backColor w-full h-full grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map(({ id, name, category, price, images }) => (
                    <Card key={id} id={id} name={name} category={category} price={price} images={images} />
                ))}
            </div>
        </div>
    );
};

 */}