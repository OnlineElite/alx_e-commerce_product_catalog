import Card from "@/components/common/Card"
import { products } from "@/constants"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from "@/store/slices/productSlice"
import { LoaderCircle, ChevronLeft, ChevronRight } from "lucide-react"
import type { RootState, AppDispatch } from "@/store/index"
import { applyFilters } from "@/store/slices/filterSlice"

const ProductList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items, loading } = useSelector((state: RootState) => state.products)
    const { selectedCategories, priceRange, sortOption, searchQuery } = useSelector((state: RootState) => state.filters)
    const { filteredAndSortedProducts } = useSelector((state: RootState) => state.filters)
    // Pagination state
    console.log("filtered products : ", filteredAndSortedProducts)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(12)

    // Apply filters whenever relevant state changes
    useEffect(() => {
        if (products.length > 0 /* items.length > 0 */) { // change products with items when the end point fixed
            dispatch(applyFilters())
        }
    }, [dispatch, products /* items */]) // change products with items when the end point fixed

    // Re-apply filters when filter criteria change
    useEffect(() => {
        if (products.length > 0 /* items.length > 0 */) { // change products with items when the end point fixed
            dispatch(applyFilters())
        }
    }, [dispatch, selectedCategories, priceRange, sortOption, searchQuery])

    // Pagination calculations
    const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredAndSortedProducts.slice(indexOfFirstItem, indexOfLastItem)

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedCategories, priceRange, sortOption, searchQuery])

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))
    const goToPage = (page: number) => setCurrentPage(Math.max(1, Math.min(page, totalPages)))

    // Generate page numbers
    const getPageNumbers = () => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }
        
        if (currentPage <= 3) {
            return [1, 2, 3, 4, '...', totalPages]
        }
        
        if (currentPage >= totalPages - 2) {
            return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
        }
        
        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
    }

    const buttonStyle = "rounded text-center py-2 px-3 border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors min-w-[40px]"
    const activeStyle = "bg-mainColor text-white border-mainColor"

    if (loading) return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/30 z-50">
            <LoaderCircle size={35} className="text-mainColor animate-spin"/>
        </div>
    )

    return (
        <div className="bg-white rounded rounded-xl shadow-sm row-span-1 col-span-3 md:col-span-2 md:row-span-1 lg:col-span-3 ">
            {/* Products Grid */}
            <div >
                <div className="bg-backColor w-full h-full p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[400px]">
                    {currentItems.length > 0 ? (
                        currentItems.map(({id, name, category, price, images}) => (
                            <Card key={id} id={id} name={name} category={category} price={price} images={images} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8 text-gray-500">
                            No products found matching your filters.
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-backColor pb-5">
                    <p className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </p>
                    
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`${buttonStyle} ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            aria-label="Previous page"
                        >
                            <ChevronLeft size={20}/>
                        </button>
                        
                        {getPageNumbers().map((page, index) => (
                            <button
                                key={index}
                                onClick={() => typeof page === 'number' && goToPage(page)}
                                className={`${buttonStyle} ${
                                    page === currentPage ? activeStyle : ''
                                } ${typeof page !== 'number' ? 'cursor-default hover:bg-white' : ''}`}
                                disabled={typeof page !== 'number'}
                                aria-current={page === currentPage ? 'page' : undefined}
                                aria-label={typeof page === 'number' ? `Go to page ${page}` : 'More pages'}
                            >
                                {page}
                            </button>
                        ))}
                        
                        <button 
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={`${buttonStyle} ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            aria-label="Next page"
                        >
                            <ChevronRight size={20}/>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductList
