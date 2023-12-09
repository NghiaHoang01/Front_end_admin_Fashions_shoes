package com.example.response;

import com.example.Entity.ParentCategory;

public class ParentCategoryResponse extends Response{
    private ParentCategory parentCategory;

    public ParentCategoryResponse(ParentCategory parentCategory) {
        this.parentCategory = parentCategory;
    }
    public ParentCategoryResponse() {
    }
    public ParentCategoryResponse(String message, Boolean success, ParentCategory parentCategory) {
        super(message, success);
        this.parentCategory = parentCategory;
    }

    public ParentCategory getParentCategory() {
        return parentCategory;
    }

    public void setParentCategory(ParentCategory parentCategory) {
        this.parentCategory = parentCategory;
    }
}
