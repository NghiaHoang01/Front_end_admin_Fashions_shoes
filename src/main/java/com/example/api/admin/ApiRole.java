package com.example.api.admin;

import com.example.Entity.Role;
import com.example.config.JwtProvider;
import com.example.exception.CustomException;
import com.example.request.RoleRequest;
import com.example.response.Response;
import com.example.response.RoleResponse;
import com.example.service.implement.RoleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController("roleOfAdmin")
@RequestMapping("/api/admin")
public class ApiRole {
    @Autowired
    private RoleServiceImpl roleService;

    @Autowired
    JwtProvider jwtProvider;

    @GetMapping("/role")
    public ResponseEntity<?> getAllRole(@RequestParam("pageIndex") int pageIndex, @RequestParam("pageSize")int pageSize){
        return new ResponseEntity<>(roleService.getAllRole(pageIndex,pageSize),HttpStatus.OK);
    }

    @PostMapping("/role")
    public ResponseEntity<?> createRole(@RequestBody RoleRequest role) throws CustomException {
        Role newRole = roleService.createRole(role);

        RoleResponse roleResponse = new RoleResponse();
        roleResponse.setRole(newRole);
        roleResponse.setMessage("Role added success !!!");
        roleResponse.setSuccess(true);
        return new ResponseEntity<>(roleResponse, HttpStatus.CREATED);
    }

    @PutMapping("/role")
    public ResponseEntity<?> updateRole(@RequestBody RoleRequest role,@RequestParam("id") Long id) throws CustomException {
        Role oldRole = roleService.updateRole(id,role);

        RoleResponse roleResponse = new RoleResponse();
        roleResponse.setRole(oldRole);
        roleResponse.setMessage("Role updated success !!!");
        roleResponse.setSuccess(true);
        return new ResponseEntity<>(roleResponse,HttpStatus.OK);
    }

    @DeleteMapping("/role")
    public ResponseEntity<?> deleteRole(@RequestParam("id") Long id) throws CustomException {
        String message = roleService.deleteRole(id);
        Response response = new Response();
        response.setMessage(message);
        response.setSuccess(true);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
