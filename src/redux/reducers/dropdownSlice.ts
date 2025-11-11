import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"; 

interface DropdownState {
  activeDropdown: string | null;
}

const initialState: DropdownState = {
  activeDropdown: null,
};


export const dropdownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    openDropdown: (state, action: PayloadAction<string>) => {
      state.activeDropdown = action.payload;
    },
    toggleDropdown: (state, action: PayloadAction<string>) => {
      state.activeDropdown =
        state.activeDropdown === action.payload ? null : action.payload;
    },
    closeAllDropdowns: (state) => {
      state.activeDropdown = null;
    },
  },
});



export const { openDropdown, toggleDropdown, closeAllDropdowns } =
  dropdownSlice.actions;

export const selectActiveDropdown = (state: RootState) =>
  state.dropdown.activeDropdown;

export default dropdownSlice.reducer;