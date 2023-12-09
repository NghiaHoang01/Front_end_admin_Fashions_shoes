package com.example.response;

import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {
    private Long id;
    private String fullName;
    private String phoneNumber;
    private String alternatePhone;
    private String address;
    private String ward;
    private String district;
    private String province;
    private String notes;
    private LocalDateTime orderDate;
    private LocalDateTime deliveryDate;
    private LocalDateTime receivingDate;
    private String paymentMethod;
    private String statusOrder;
    private double transportFee;
    private double totalPrice;
    private List<OrderLineResponse> orderLines;

    public OrderResponse() {
    }

    public OrderResponse(Long id, String fullName, String phoneNumber, String alternatePhone,
                         String address, String ward, String district, String province, String notes,
                         LocalDateTime orderDate, LocalDateTime deliveryDate, LocalDateTime receivingDate,
                         String paymentMethod, String statusOrder, double transportFee, double totalPrice, List<OrderLineResponse> orderLines) {
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.alternatePhone = alternatePhone;
        this.address = address;
        this.ward = ward;
        this.district = district;
        this.province = province;
        this.notes = notes;
        this.orderDate = orderDate;
        this.deliveryDate = deliveryDate;
        this.receivingDate = receivingDate;
        this.paymentMethod = paymentMethod;
        this.statusOrder = statusOrder;
        this.transportFee = transportFee;
        this.totalPrice = totalPrice;
        this.orderLines = orderLines;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAlternatePhone() {
        return alternatePhone;
    }

    public void setAlternatePhone(String alternatePhone) {
        this.alternatePhone = alternatePhone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getWard() {
        return ward;
    }

    public void setWard(String ward) {
        this.ward = ward;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(LocalDateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public LocalDateTime getReceivingDate() {
        return receivingDate;
    }

    public void setReceivingDate(LocalDateTime receivingDate) {
        this.receivingDate = receivingDate;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getStatusOrder() {
        return statusOrder;
    }

    public void setStatusOrder(String statusOrder) {
        this.statusOrder = statusOrder;
    }

    public double getTransportFee() {
        return transportFee;
    }

    public void setTransportFee(double transportFee) {
        this.transportFee = transportFee;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<OrderLineResponse> getOrderLines() {
        return orderLines;
    }

    public void setOrderLines(List<OrderLineResponse> orderLines) {
        this.orderLines = orderLines;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }
}
