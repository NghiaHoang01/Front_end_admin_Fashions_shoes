import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    showSideBar: true
}

export const header = createSlice({
    name: 'headerSlice',
    initialState,
    reducers: {
        handleShowSideBar: (state) => {
            state.showSideBar = !state.showSideBar
        }
    },
})

export const { handleShowSideBar } = header.actions
export const headerSelector = state => state.header
export default header.reducer