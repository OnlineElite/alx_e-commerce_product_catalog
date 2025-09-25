import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  selectedCategories: string[]
  priceRange: [number, number]
  sortOption: string
  searchQuery: string
}

const initialState: FilterState = {
  selectedCategories: [],
  priceRange: [0, 1000],
  sortOption: 'Sort by: Default',
  searchQuery: ''
}

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
    }
  }
})

export const { setCategories, setPriceRange, setSortOption, setSearchQuery, clearAllFilters } = filterSlice.actions
export default filterSlice.reducer
