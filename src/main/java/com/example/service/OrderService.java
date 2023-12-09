package com.example.service;

import com.example.Entity.Order;
import com.example.exception.CustomException;
import com.example.request.OrderRequest;
import com.example.response.OrderResponse;

import java.util.List;

public interface OrderService {
    void placeOrderCOD(OrderRequest orderRequest) throws CustomException;
    List<OrderResponse> getOrderDetailsByUser() throws CustomException;
    Order markOrderConfirmed(Long id) throws CustomException;

    Order markOrderShipped(Long id) throws CustomException;

    Order markOrderDelivered(Long id) throws CustomException;

    List<Order> getAllOrderDetailsByStatus(String status, int pageIndex, int pageSize);

    void cancelOrderByUser(Long idOrder) throws CustomException;

    String deleteOrderByAdmin(Long id) throws CustomException;


}
