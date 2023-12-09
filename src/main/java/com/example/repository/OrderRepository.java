package com.example.repository;

import com.example.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByStatus(String status);

    List<Order> findByUserId(Long userId);

    List<Order> findByUserIdOrderByIdDesc(Long userId);
    Order findTop1ByOrderByIdDesc();
}
