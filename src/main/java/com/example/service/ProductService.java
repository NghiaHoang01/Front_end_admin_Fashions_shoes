package com.example.service;

import com.example.Entity.Product;
import com.example.exception.CustomException;
import com.example.request.FilterProductsByAdminRequest;
import com.example.request.ProductRequest;
import com.example.response.ProductResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    Product createProduct(ProductRequest productRequest) throws CustomException, IOException;

    Product updateProduct(Long id, ProductRequest productRequest) throws CustomException, IOException;

    void deleteProduct(Long id) throws CustomException;

    void deleteSomeProducts (List<Long> listIdProducts) throws CustomException;

    ProductResponse filterProductsByAdmin(String name, Long brandId, Long parentCategoryId, Long childCategoryId, String color,
                                          Integer discountedPercent, String createBy, String updateBy, int pageIndex, int pageSize) throws CustomException;

    List<Product> getAllProduct();

    String getMainImageBas64(Long idProduct) throws CustomException;

    List<String> getSecondaryImagesBase64(Long idProduct) throws CustomException;

    ProductResponse getTwelveNewestProducts() throws CustomException;

    ProductResponse getTwelveProductsLeastQuantity();

    ProductResponse getTwelveProductsMostQuantity();

    ProductResponse filterProduct(String name, Long brandId, Long parentCategoryId, Long childCategoryId, String color,
                                  Double minPrice, Double maxPrice, String sort, Boolean sale, int pageIndex, int pageSize);

    Product getDetailProduct(Long id) throws CustomException;

    Long getTheHighestPriceOfProduct();

    ProductResponse getSimilarProductsByBrandId(Long brandId,Long productId);

    // Not test

    List<Product> findProductByBrand(String brand, int pageIndex, int pageSize) throws CustomException;

    List<Product> findProductByParentCategory(String brand, String parentCategory, int pageIndex, int pageSize) throws CustomException;

    List<Product> findProductByChildCategory(String brand, String parentCategory, String childCategory, int pageIndex, int pageSize) throws CustomException;



    List<Product> getAllProductBySearch(String search,int pageIndex,int pageSize);


    Product getLastProduct();

    int countProductByBrand(String brandName);

    int countProductByBrandAndParentCategory(String brandName, String parentCategory);

    Long countAllProducts();

    int countProductBySearch(String search);



}
