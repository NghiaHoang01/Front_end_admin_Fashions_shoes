package com.example.response;

import com.example.Entity.Brand;

public class BrandResponse extends Response{
    private Brand brand;

    public BrandResponse() {
    }

    public BrandResponse(Brand brand) {
        this.brand = brand;
    }

    public BrandResponse(String message, Boolean success, Brand brand) {
        super(message, success);
        this.brand = brand;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }
}
