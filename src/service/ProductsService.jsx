import queryString from "query-string"
import request from "utils/Request"

// get all brands
export const getAllBrandsService = () => {
    return request('/api/brands', {
        method: 'GET'
    })
}

// get all parent categories by brand
export const getParentCategoriesByBrandIdService = (params) => {
    return request(`/api/parentCategories?${queryString.stringify(params)}`, {
        method: 'GET'
    })
}

// get all child categories by parent category
export const getAllChildCategoriesByParentCategoryIdService = (params) => {
    return request(`/api/childCategories?${queryString.stringify(params)}`, {
        method: 'GET'
    })
}

// get all products or filter products
export const getAllProductsService = (params) => {
    return request(`/api/admin/products?${queryString.stringify(params)}`, {
        method: 'GET'
    })
}

// create new product
export const createNewProductService = (params) => {
    return request('/api/admin/product', {
        method: 'POST',
        data: params
    })
}

// update product
export const updateProductService = (params) => {
    return request(`/api/admin/product?id=${params.id}`, {
        method: 'PUT',
        data: params
    })
}

// delete product by id
export const deleteProductService = (id) => {
    return request(`/api/admin/product?id=${id}`, {
        method: 'DELETE'
    })
}

// delete some products
export const deleteSomeProductsService = (params) => {
    return request(`/api/admin/products/${params}`, {
        method: 'DELETE'
    })
}

// get main image base64
export const getMainImageBas64Service = (id) => {
    return request(`/api/product/main/image?${queryString.stringify(id)}`, {
        method: 'GET'
    })
}

// get secondary images base 64
export const getSecondaryImagesBase64Service = (id) => {
    return request(`/api/produt/secondary/images?${queryString.stringify(id)}`, {
        method: 'GET'
    })
}