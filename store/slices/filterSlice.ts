import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '@/store/index'
import { ProductProps } from '@/interfaces'
import { products } from "@/constants"

interface FilterState {
  selectedCategories: string[]
  priceRange: [number, number]
  sortOption: string
  searchQuery: string
  filteredAndSortedProducts: ProductProps[]
  loading: boolean
}

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
    //const { items } = state.products // enable items when the end point fixed
    const { selectedCategories, priceRange, sortOption, searchQuery } = state.filters

    // Filtering and sorting logic
    const filteredAndSortedProducts = products // change products with items when the end point fixed
      .filter(product => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category.name)
        const priceMatch = Number(product.price) >= priceRange[0] && Number(product.price) <= priceRange[1]
        const searchMatch = searchQuery === '' 
                          || product.name.toLowerCase().includes(searchQuery.toLowerCase()) 
                          || (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
        
        return categoryMatch && priceMatch && searchMatch
      })
      .sort((a, b) => {
        switch (sortOption) {
          case "Price: Low to High": return Number(a.price) - Number(b.price)
          case "Price: High to Low": return Number(b.price) - Number(a.price)
          case "Name: A to Z": return a.name.localeCompare(b.name)
          case "Name: Z to A": return b.name.localeCompare(a.name)
          default: return 0 
        }
      })

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
 