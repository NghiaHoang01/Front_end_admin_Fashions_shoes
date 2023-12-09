package com.example.api.admin;

import com.example.Entity.ChildCategory;
import com.example.exception.CustomException;
import com.example.request.ChildCategoryRequest;
import com.example.response.ChildCategoryResponse;
import com.example.response.Response;
import com.example.service.implement.ChildCategoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("ChildCategoryRoleAdmin")
@RequestMapping("/api/admin")
public class ApiChildCategory {
    @Autowired
    private ChildCategoryServiceImpl childCategoryService;

    @GetMapping("/childCategory")
    public ResponseEntity<?> getAllChildCategory(@RequestParam("pageIndex") int pageIndex, @RequestParam("pageSize")int pageSize){
        List<ChildCategory> childCategories = childCategoryService.getAllChildCategory(pageIndex, pageSize);

        return new ResponseEntity<>(childCategories, HttpStatus.OK);
    }

    @PostMapping("/childCategory")
    public ResponseEntity<?> createChildCategory(@RequestBody ChildCategoryRequest childCategoryRequest) throws CustomException {
        ChildCategory childCategory = childCategoryService.createChildCategory(childCategoryRequest);

        ChildCategoryResponse childCategoryResponse = new ChildCategoryResponse();
        childCategoryResponse.setChildCategory(childCategory);
        childCategoryResponse.setMessage("Child category created success !!!");
        childCategoryResponse.setSuccess(true);

        return new ResponseEntity<>(childCategoryResponse, HttpStatus.OK);
    }

    @PutMapping("/childCategory")
    public ResponseEntity<?> updateChildCategory(@RequestBody ChildCategoryRequest childCategoryRequest, @RequestParam("id")Long id) throws CustomException {
        ChildCategory childCategory = childCategoryService.updateChildCategory(id,childCategoryRequest);

        ChildCategoryResponse childCategoryResponse = new ChildCategoryResponse();
        childCategoryResponse.setChildCategory(childCategory);
        childCategoryResponse.setMessage("Child category updated success !!!");
        childCategoryResponse.setSuccess(true);

        return new ResponseEntity<>(childCategoryResponse, HttpStatus.OK);
    }

    @DeleteMapping("/childCategory")
    public ResponseEntity<?> deleteChildCategory(@RequestParam("id")Long id) throws CustomException {
        String message = childCategoryService.deleteChildCategory(id);

        Response response = new Response();
        response.setMessage(message);
        response.setSuccess(true);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
