package com.example.api.admin;

import com.example.Entity.ParentCategory;
import com.example.exception.CustomException;
import com.example.request.ParentCategoryRequest;
import com.example.response.ParentCategoryResponse;
import com.example.response.Response;
import com.example.service.implement.ParentCategoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("parentCategoryRoleAdmin")
@RequestMapping("/api/admin")
public class ApiParentCategory {
    @Autowired
    private ParentCategoryServiceImpl parentCategoryService;

    @GetMapping("/parentCategory")
    public ResponseEntity<?> getAllParentCategory(@RequestParam("pageIndex") int pageIndex, @RequestParam("pageSize")int pageSize){
        List<ParentCategory> parentCategories = parentCategoryService.getAllParentCategory(pageIndex,pageSize);

        return new ResponseEntity<>(parentCategories,HttpStatus.OK);
    }

    @PostMapping("/parentCategory")
    public ResponseEntity<?> createParentCategory(@RequestBody ParentCategoryRequest parentCategoryRequest) throws CustomException {
        ParentCategory parentCategory = parentCategoryService.createdParentCategory(parentCategoryRequest);

        ParentCategoryResponse parentCategoryResponse = new ParentCategoryResponse();
        parentCategoryResponse.setParentCategory(parentCategory);
        parentCategoryResponse.setMessage("Parent category created success !!!");
        parentCategoryResponse.setSuccess(true);

        return new ResponseEntity<>(parentCategoryResponse, HttpStatus.OK);
    }

    @PutMapping("parentCategory")
    public ResponseEntity<?> updateParentCategory(@RequestBody ParentCategoryRequest parentCategoryRequest,@RequestParam("id") Long id) throws CustomException {
        ParentCategory parentCategory = parentCategoryService.updateParentCategory(id,parentCategoryRequest);

        ParentCategoryResponse parentCategoryResponse = new ParentCategoryResponse();
        parentCategoryResponse.setParentCategory(parentCategory);
        parentCategoryResponse.setMessage("Parent category updated success !!!");
        parentCategoryResponse.setSuccess(true);

        return new ResponseEntity<>(parentCategoryResponse,HttpStatus.OK);
    }

    @DeleteMapping("/parentCategory")
    public ResponseEntity<?> deleteParentCategory(@RequestParam("id") Long id) throws CustomException {
        String message = parentCategoryService.deleteParentCategory(id);

        Response response = new Response();
        response.setMessage(message);
        response.setSuccess(true);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

}
