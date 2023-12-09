package com.example.api.admin;

import com.example.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController("orderAdmin")
@RequestMapping("/api/admin")
public class ApiOrder {
    @Autowired
    private OrderService orderDetailService;

    @GetMapping("/orderDetail")
    public ResponseEntity<?> getAllOrderDetails(@RequestParam("pageIndex") int pageIndex,
                                                @RequestParam("pageSize") int pageSize,
                                                @RequestParam("status") String status) {
        return new ResponseEntity<>(orderDetailService.getAllOrderDetailsByStatus(status, pageIndex, pageSize), HttpStatus.OK);
    }
}
