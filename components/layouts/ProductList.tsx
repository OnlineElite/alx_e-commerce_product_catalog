import Card from "@/components/common/Card"
import { products } from "@/constants"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from "@/store/slices/productSlice"
import { LoaderCircle } from "lucide-react"
import type { RootState, AppDispatch } from "@/store/index"

const ProductList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items, loading } = useSelector((state: RootState) => state.products)
    const { selectedCategories, priceRange, sortOption, searchQuery } = useSelector((state: RootState) => state.filters)

    // Filter and sort products
    const filteredAndSortedProducts = products
        .filter(product => {
            // Category filter
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category.name)
            
            // Price range filter
            const priceMatch = Number(product.price) >= priceRange[0] &&  Number(product.price) <= priceRange[1]
            
            // Search filter
            const searchMatch = searchQuery === '' || 
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
            
            return categoryMatch && priceMatch && searchMatch
        })
        .sort((a, b) => {
            switch (sortOption) {
                case "Price: Low to High":
                    return Number(a.price) - Number(b.price)
                case "Price: High to Low":
                    return Number(b.price) - Number(a.price)
                case "Name: A to Z":
                    return a.name.localeCompare(b.name)
                case "Name: Z to A":
                    return b.name.localeCompare(a.name)
                default:
                    return 0 // Default order
            }
        })

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    if(loading) 
    return (
        <div className="absolute top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center bg-white/30 z-150">
            <p className="z-100 absolute text-black flex item-center justify-center">
                <LoaderCircle size={35} className="text-mainColor animate-spin"/>
            </p>
        </div>
    )

    return(
        <div className="bg-white rounded rounded-xl shadow-sm row-span-1 col-span-3 md:col-span-2 md:row-span-1 lg:col-span-3 ">
            <div className="bg-backColor w-full h-full p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[400px]">
                {filteredAndSortedProducts.length > 0 ? (
                    filteredAndSortedProducts.map(({id, name, category, price, images}) => (
                        <Card key={id} id={id} name={name} category={category} price={price} images={images} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-8 text-gray-500">
                        No products found matching your filters.
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductList


/* //import { products } from "@/constants"
import Card from "@/components/common/Card"
//import { ProductProps } from "@/interfaces"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from "@/store/slices/productSlice"
import { LoaderCircle } from "lucide-react";
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

export default ProductList; */

