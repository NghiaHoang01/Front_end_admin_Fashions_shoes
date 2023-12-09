package com.example.service.implement;

import com.example.Entity.Brand;
import com.example.Entity.ParentCategory;
import com.example.Entity.User;
import com.example.config.JwtProvider;
import com.example.exception.CustomException;
import com.example.repository.BrandRepository;
import com.example.repository.ParentCategoryRepository;
import com.example.request.ParentCategoryRequest;
import com.example.service.ParentCategoryService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ParentCategoryServiceImpl implements ParentCategoryService {
    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private ParentCategoryRepository parentCategoryRepository;

    @Override
    @Transactional
    public ParentCategory createdParentCategory(ParentCategoryRequest parentCategoryRequest) throws CustomException {
        parentCategoryRequest.setName(parentCategoryRequest.getName().toUpperCase());
        parentCategoryRequest.setBrand(parentCategoryRequest.getBrand().toUpperCase());

        Brand brand = brandRepository.findByName(parentCategoryRequest.getBrand());

        if (brand == null) {
            throw new CustomException("Brand with name " + parentCategoryRequest.getBrand() + " not found !!!");
        } else {

            ParentCategory check = parentCategoryRepository.findByNameAndBrandName(parentCategoryRequest.getName(), brand.getName());

            if (check == null) {
                String token = jwtProvider.getTokenFromCookie(request);
                User admin = userService.findUserProfileByJwt(token);

                ParentCategory parentCategory = new ParentCategory();

                parentCategory.setName(parentCategoryRequest.getName());
                parentCategory.setCreatedBy(admin.getEmail());
                parentCategory.setBrand(brand);
                return parentCategoryRepository.save(parentCategory);
            } else {
                throw new CustomException("Parent category with name " + parentCategoryRequest.getName() + " of brand " + parentCategoryRequest.getBrand() + " already exist !!!");
            }
        }
    }

    @Override
    @Transactional
    public ParentCategory updateParentCategory(Long id, ParentCategoryRequest parentCategoryRequest) throws CustomException {
        Optional<ParentCategory> oldParentCategory = parentCategoryRepository.findById(id);

        if (oldParentCategory.isPresent()) {

            parentCategoryRequest.setName(parentCategoryRequest.getName().toUpperCase());

            ParentCategory check = parentCategoryRepository.findByNameAndBrandName(parentCategoryRequest.getName(), oldParentCategory.get().getBrand().getName());

            if (check == null || check.getName().equals(oldParentCategory.get().getName())) {
                String token = jwtProvider.getTokenFromCookie(request);
                User admin = userService.findUserProfileByJwt(token);

                oldParentCategory.get().setUpdateBy(admin.getEmail());
                oldParentCategory.get().setName(parentCategoryRequest.getName());

                return parentCategoryRepository.save(oldParentCategory.get());
            } else {
                throw new CustomException("Parent category with name " + parentCategoryRequest.getName() + " of brand " + oldParentCategory.get().getBrand().getName() + " already exist !!!");
            }
        } else {
            throw new CustomException("Parent category with id: " + id + " not found !!!");
        }
    }

    @Override
    @Transactional
    public String deleteParentCategory(Long id) throws CustomException {
        Optional<ParentCategory> parentCategory = parentCategoryRepository.findById(id);
        if (parentCategory.isPresent()) {
            parentCategoryRepository.deleteById(id);
            return "Delete success !!!";
        }
        return "Not found parent category with id: " + id;
    }

    @Override
    public Set<ParentCategory> getAllParentCategoryByBrandId(Long brandId) throws CustomException {
        Optional<Brand> brand = brandRepository.findById(brandId);
        if (brand.isPresent()) {
            return parentCategoryRepository.getAllParentCategoryByBrandId(brandId);
        } else {
            throw new CustomException("Brand not found with name: " + brandId);
        }
    }

    @Override
    public List<ParentCategory> getAllParentCategory(int pageIndex, int pageSize) {
        Pageable pageable = PageRequest.of(pageIndex-1, pageSize);
        return parentCategoryRepository.findAll(pageable).getContent();
    }
}
