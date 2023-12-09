package com.example.api.admin;

import com.example.Entity.Brand;
import com.example.exception.CustomException;
import com.example.request.BrandRequest;
import com.example.response.BrandResponse;
import com.example.response.Response;
import com.example.service.implement.BrandServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController("brandOfAdmin")
@RequestMapping("/api/admin")
public class ApiBrand {
    @Autowired
    private BrandServiceImpl brandService;

    @GetMapping("/brand")
    public ResponseEntity<?> getBrandInformation(@RequestParam("id")Long id) throws CustomException {
        Brand brand = brandService.getBrandInformation(id);
        return new ResponseEntity<>(brand, HttpStatus.OK);
    }

    @PostMapping("/brand")
    public ResponseEntity<?> createBrand(@RequestBody BrandRequest brandRequest) throws CustomException {
        Brand brand = brandService.createBrand(brandRequest);

        BrandResponse brandResponse = new BrandResponse();
        brandResponse.setBrand(brand);
        brandResponse.setSuccess(true);
        brandResponse.setMessage("Brand created success !!!");

        return new ResponseEntity<>(brandResponse,HttpStatus.OK);
    }

    @PutMapping("/brand")
    public ResponseEntity<?> updateBrand(@RequestBody BrandRequest brandRequest,@RequestParam("id")Long id) throws CustomException {
        Brand brand = brandService.updateBrand(id,brandRequest);

        BrandResponse brandResponse = new BrandResponse();
        brandResponse.setBrand(brand);
        brandResponse.setSuccess(true);
        brandResponse.setMessage("Brand with id: " + id + " updated success !!!");

        return new ResponseEntity<>(brandResponse,HttpStatus.OK);
    }

    @DeleteMapping("/brand")
    public ResponseEntity<?> deleteBrand(@RequestParam("id")Long id) throws CustomException {
        String message = brandService.deleteBrand(id);

        Response response = new Response();
        response.setMessage(message);
        response.setSuccess(true);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
