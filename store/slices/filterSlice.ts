import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '@/store/index'
import { FilterState } from '@/interfaces'
//import { products } from "@/constants"

const initialState: FilterState = {
  selectedCategories: [],
  priceRange: [0, 1000],
  sortOption: 'Sort by: Default',
  searchQuery: '',
  filteredAndSortedProducts: [],
  loading: false
}

// Thunk to handle filtering and sorting logic
export const applyFilters = createAsyncThunk(
  'filters/applyFilters',
  (_, { getState }) => {
    const state = getState() as RootState
    const { items } = state.products
    const { selectedCategories, priceRange, sortOption, searchQuery } = state.filters
    console.log("items in filterSlice", items)
    // Filtering and sorting logic
    const filteredAndSortedProducts = items 
      .filter(product => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category_name)
        const priceMatch = Number(product.price.amount) >= priceRange[0] && Number(product.price.amount) <= priceRange[1]
        const searchMatch = searchQuery === '' 
                          || product.name.toLowerCase().includes(searchQuery.toLowerCase()) 
                          || (product.short_description && product.short_description.toLowerCase().includes(searchQuery.toLowerCase()))
        
        return categoryMatch && priceMatch && searchMatch
      })
      .sort((a, b) => {
        switch (sortOption) {
          case "Price: Low to High": return Number(a.price.amount) - Number(b.price.amount)
          case "Price: High to Low": return Number(b.price.amount) - Number(a.price.amount)
          case "Name: A to Z": return a.name.localeCompare(b.name)
          case "Name: Z to A": return b.name.localeCompare(a.name)
          default: return 0 
        }
      })
      console.log("filteredAndSortedProducts in filterSlice", filteredAndSortedProducts)
    return filteredAndSortedProducts
  }
)

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload
    },
    setSortOption: (state, action: PayloadAction<string>) => {
      state.sortOption = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    clearAllFilters: (state) => {
      state.selectedCategories = []
      state.priceRange = [0, 1000]
      state.searchQuery = ''
      state.sortOption = 'Sort by: Default'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyFilters.pending, (state) => {
        state.loading = true
      })
      .addCase(applyFilters.fulfilled, (state, action) => {
        state.filteredAndSortedProducts = action.payload
        state.loading = false
      })
      .addCase(applyFilters.rejected, (state) => {
        state.loading = false
        state.filteredAndSortedProducts = []
      })
  }
})

export const { 
  setCategories, 
  setPriceRange, 
  setSortOption, 
  setSearchQuery, 
  clearAllFilters, 
} = filterSlice.actions

export default filterSlice.reducer
 