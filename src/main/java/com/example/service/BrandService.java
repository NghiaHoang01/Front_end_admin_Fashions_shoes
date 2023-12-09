package com.example.service;

import com.example.Entity.Brand;
import com.example.exception.CustomException;
import com.example.request.BrandRequest;

import java.util.List;

public interface BrandService {
    Brand createBrand(BrandRequest brand) throws  CustomException;
    Brand updateBrand(Long id, BrandRequest brand) throws CustomException;
    String deleteBrand(Long id) throws CustomException;
    Brand getBrandInformation(Long id) throws CustomException;
    List<Brand> getAllBrand();
}
