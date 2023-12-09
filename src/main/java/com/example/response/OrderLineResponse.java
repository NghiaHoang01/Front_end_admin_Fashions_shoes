package com.example.response;

public class OrderLineResponse {
    private Long productId;
    private String mainImageBase64;
    private String nameProduct;
    private int quantity;
    private int size;
    private Double totalPrice;

    public OrderLineResponse() {
    }

    public OrderLineResponse(Long productId, String mainImageBase64, String nameProduct, int quantity, int size, Double totalPrice) {
        this.productId = productId;
        this.mainImageBase64 = mainImageBase64;
        this.nameProduct = nameProduct;
        this.quantity = quantity;
        this.size = size;
        this.totalPrice = totalPrice;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getMainImageBase64() {
        return mainImageBase64;
    }

    public void setMainImageBase64(String mainImageBase64) {
        this.mainImageBase64 = mainImageBase64;
    }

    public String getNameProduct() {
        return nameProduct;
    }

    public void setNameProduct(String nameProduct) {
        this.nameProduct = nameProduct;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
