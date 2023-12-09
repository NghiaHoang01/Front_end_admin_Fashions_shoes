package com.example.request;

public class ChildCategoryRequest {
    private String name;
    private String brand;
    private String parentCategory;

    public ChildCategoryRequest() {
    }

    public ChildCategoryRequest(String name, String brand, String parentCategory) {
        this.name = name;
        this.brand = brand;
        this.parentCategory = parentCategory;
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

    public String getParentCategory() {
        return parentCategory;
    }

    public void setParentCategory(String parentCategory) {
        this.parentCategory = parentCategory;
    }
}
