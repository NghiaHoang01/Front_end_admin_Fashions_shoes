package com.example.service.implement;

import com.example.Entity.Brand;
import com.example.Entity.ChildCategory;
import com.example.Entity.ParentCategory;
import com.example.Entity.User;
import com.example.config.JwtProvider;
import com.example.exception.CustomException;
import com.example.repository.BrandRepository;
import com.example.repository.ChildCategoryRepository;
import com.example.repository.ParentCategoryRepository;
import com.example.request.ChildCategoryRequest;
import com.example.service.ChildCategoryService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ChildCategoryServiceImpl implements ChildCategoryService {
    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private ParentCategoryRepository parentCategoryRepository;
    @Autowired
    private ChildCategoryRepository childCategoryRepository;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private UserServiceImpl userService;

    @Override
    @Transactional
    public ChildCategory createChildCategory(ChildCategoryRequest childCategoryRequest) throws CustomException {
        childCategoryRequest.setName(childCategoryRequest.getName().toUpperCase());
        childCategoryRequest.setBrand(childCategoryRequest.getBrand().toUpperCase());
        childCategoryRequest.setParentCategory(childCategoryRequest.getParentCategory().toUpperCase());

        Brand brand = brandRepository.findByName(childCategoryRequest.getBrand());
        if(brand != null){

            ParentCategory parentCategory = parentCategoryRepository.findByNameAndBrandName(childCategoryRequest.getParentCategory(),brand.getName());

            if(parentCategory != null){
                ChildCategory check = childCategoryRepository.findByNameAndParentCategoryNameAndBrandName(childCategoryRequest.getName(),parentCategory.getName(),brand.getName());

                if(check == null){
                    String token = jwtProvider.getTokenFromCookie(request);
                    User admin = userService.findUserProfileByJwt(token);

                    ChildCategory childCategory = new ChildCategory();
                    childCategory.setName(childCategoryRequest.getName());
                    childCategory.setParentCategory(parentCategory);
                    childCategory.setCreatedBy(admin.getEmail());

                    return childCategoryRepository.save(childCategory);
                }else{
                    throw new CustomException("Child category with name: " + childCategoryRequest.getName() + " already exist !!!");
                }
            }else{
                throw new CustomException("Parent category with name " + childCategoryRequest.getParentCategory() + " of brand " + brand.getName() + " not already exist !!!");
            }
        }else{
            throw new CustomException("Brand not found with name: " + childCategoryRequest.getBrand());
        }
    }

    @Override
    @Transactional
    public ChildCategory updateChildCategory(Long id, ChildCategoryRequest childCategoryRequest) throws CustomException {
        Optional<ChildCategory> oldChildCategory = childCategoryRepository.findById(id);

        if(oldChildCategory.isPresent()){
            childCategoryRequest.setName(childCategoryRequest.getName().toUpperCase());

            ChildCategory check = childCategoryRepository.findByNameAndParentCategoryNameAndBrandName(childCategoryRequest.getName(),oldChildCategory.get().getParentCategory().getName(),oldChildCategory.get().getParentCategory().getBrand().getName());

            if(check == null || check.getName().equals(oldChildCategory.get().getName())){
                String token = jwtProvider.getTokenFromCookie(request);
                User admin = userService.findUserProfileByJwt(token);

                oldChildCategory.get().setName(childCategoryRequest.getName());
                oldChildCategory.get().setUpdateBy(admin.getEmail());

                return childCategoryRepository.save(oldChildCategory.get());
            }else{
                throw new CustomException("Child category with name: " + childCategoryRequest.getName() + " already exist !!!");
            }
        }else{
            throw new CustomException("Child category not found with id: " + id);
        }
    }

    @Override
    @Transactional
    public String deleteChildCategory(Long id) throws CustomException {
        Optional<ChildCategory> check = childCategoryRepository.findById(id);
        if(check.isPresent()){
            childCategoryRepository.delete(check.get());
            return "Delete success !!!";
        }else{
            return "Child category not found with id: " + id;
        }
    }

    @Override
    public List<ChildCategory> getAllChildCategory(int pageIndex, int pageSize) {
        Pageable pageable = PageRequest.of(pageIndex-1,pageSize);
        return childCategoryRepository.findAll(pageable).getContent();
    }

    @Override
    public List<ChildCategory> getAllChildCategoryByParentCategoryId(Long parentCategoryId) throws CustomException {
        return childCategoryRepository.getAllChildCategoryByParentCategoryId(parentCategoryId);
    }
}
