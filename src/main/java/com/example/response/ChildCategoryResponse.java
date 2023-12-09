package com.example.response;

import com.example.Entity.ChildCategory;

public class ChildCategoryResponse extends Response{
    private ChildCategory childCategory;

    public ChildCategoryResponse() {
    }

    public ChildCategoryResponse(ChildCategory childCategory) {
        this.childCategory = childCategory;
    }

    public ChildCategoryResponse(String message, Boolean success, ChildCategory childCategory) {
        super(message, success);
        this.childCategory = childCategory;
    }

    public ChildCategory getChildCategory() {
        return childCategory;
    }

    public void setChildCategory(ChildCategory childCategory) {
        this.childCategory = childCategory;
    }
}
