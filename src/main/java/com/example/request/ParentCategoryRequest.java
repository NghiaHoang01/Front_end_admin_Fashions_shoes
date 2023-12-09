package com.example.request;

public class ParentCategoryRequest {
    private String name;
    private String brand;

    public ParentCategoryRequest() {
    }

    public ParentCategoryRequest(String name, String brand) {
        this.name = name;
        this.brand = brand;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }
}
