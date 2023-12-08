import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createNewProductService, deleteProductService, deleteSomeProductsService, getAllBrandsService, getAllChildCategoriesByParentCategoryIdService, getAllProductsService, getMainImageBas64Service, getParentCategoriesByBrandIdService, getSecondaryImagesBase64Service, updateProductService } from "service/ProductsService"

const initialState = {
    isLoading: false,
    listBrands: [],
    listParentCategories: [],
    listChildCategories: [],
    productInfor: {},
    listProducts: [],
    totalProduct: 0,
    mainImageBase64: '',
    secondaryImagesBase64: []
}

// get all brands
export const getAllBrandsAsync = createAsyncThunk('getAllBrands', async () => {
    const response = await getAllBrandsService()
    return response.data
})

// get all parent categories by brand id
export const getAllParentCategoriesByBrandAsync = createAsyncThunk("getParentCategories", async (params) => {
    const response = await getParentCategoriesByBrandIdService(params)
    return response.data
})

// get all child categories by parent category id
export const getAllChildCategoriesByParentCategoryIdAsync = createAsyncThunk("getChildCategories", async (params) => {
    const response = await getAllChildCategoriesByParentCategoryIdService(params)
    return response.data
})

// get all products or filter products
export const getAllProductsAsync = createAsyncThunk('getAllProducts', async (params) => {
    const response = await getAllProductsService(params)
    return response.data
})

// create new product
export const createNewProductAsync = createAsyncThunk("createProduct", async (params) => {
    const response = await createNewProductService(params)
    return response.data
})

//update product
export const updateProductAsync = createAsyncThunk("updateProduct", async (params) => {
    const response = await updateProductService(params)
    return response.data
})

// delete product
export const deleteProductAsync = createAsyncThunk("deleteProduct", async (id) => {
    const response = await deleteProductService(id)
    return response.data
})

// delete some products
export const deleteSomeProductsAsync = createAsyncThunk("deleteSomeProducts", async (params) => {
    const response = await deleteSomeProductsService(params)
    return response.data
})

// get main image base 64
export const getMainImageBase64Async = createAsyncThunk("getMainImage", async (id) => {
    const response = await getMainImageBas64Service(id)
    return response.data
})

// get secondary images base 64
export const getSecondaryImagesBase64Async = createAsyncThunk("getSecondaryImages", async (id) => {
    const response = await getSecondaryImagesBase64Service(id)
    return response.data
})

export const products = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder

            // get all brands
            .addCase(getAllBrandsAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllBrandsAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.listBrands = action.payload
            })

            // get parent categories by brand id
            .addCase(getAllParentCategoriesByBrandAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllParentCategoriesByBrandAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.listParentCategories = action.payload
            })

            // get all child categories by parent category id
            .addCase(getAllChildCategoriesByParentCategoryIdAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllChildCategoriesByParentCategoryIdAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.listChildCategories = action.payload
            })

            // filter products
            .addCase(getAllProductsAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllProductsAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.listProducts = action.payload.results.listProducts
                state.totalProduct = action.payload.results.totalProduct
            })

            // create new product
            .addCase(createNewProductAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNewProductAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.productInfor = action.payload
            })

            // update product
            .addCase(updateProductAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.productInfor = action.payload
            })

            // delete product
            .addCase(deleteProductAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProductAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.productInfor = action.payload
            })

            // delete some products
            .addCase(deleteSomeProductsAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteSomeProductsAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.productInfor = action.payload
            })

            // get main image base 64
            .addCase(getMainImageBase64Async.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMainImageBase64Async.fulfilled, (state, action) => {
                state.isLoading = false
                state.mainImageBase64 = action.payload.results
            })

            // get secondary images
            .addCase(getSecondaryImagesBase64Async.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSecondaryImagesBase64Async.fulfilled, (state, action) => {
                state.isLoading = false
                state.secondaryImagesBase64 = action.payload.results
            })
    }
})

export const productsSelector = state => state.products

export default products.reducer