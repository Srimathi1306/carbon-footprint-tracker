package com.carbonfootprint.footprint_backend.service.impl;

import com.carbonfootprint.footprint_backend.dto.EmissionFactorRequest;
import com.carbonfootprint.footprint_backend.dto.EmissionFactorResponse;
import com.carbonfootprint.footprint_backend.entity.Category;
import com.carbonfootprint.footprint_backend.entity.EmissionFactor;
import com.carbonfootprint.footprint_backend.repository.EmissionFactorRepository;
import com.carbonfootprint.footprint_backend.repository.CategoryRepository;
import com.carbonfootprint.footprint_backend.service.EmissionFactorService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmissionFactorServiceImpl implements EmissionFactorService {

    private final EmissionFactorRepository repository;
    private final CategoryRepository categoryRepository;


    public EmissionFactorServiceImpl(
            EmissionFactorRepository repository,
            CategoryRepository categoryRepository
    ) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
    }


    // Used by ActivityService
    @Override
    public EmissionFactor getEmissionFactorById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Emission Factor not found")
                );
    }
    @Override
    public EmissionFactorResponse createEmissionFactor(
            EmissionFactorRequest request
    ) {

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new RuntimeException("Category not found")
                );

        EmissionFactor factor = EmissionFactor.builder()
                .category(category)
                .activityType(request.getActivityType())
                .unit(request.getUnit())
                .emissionFactor(request.getEmissionFactor())
                .status(request.getStatus())
                .build();

        return mapToResponse(repository.save(factor));
    }

    // User side
    @Override
    public List<EmissionFactorResponse> getActiveEmissionFactors() {

        return repository.findByStatusTrue()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    // Admin side
    @Override
    public List<EmissionFactorResponse> getAllEmissionFactors() {

        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    @Override
    public EmissionFactorResponse getEmissionFactor(Long id) {

        return mapToResponse(getEmissionFactorById(id));
    }





    @Override
    public EmissionFactorResponse updateEmissionFactor(
            Long id,
            EmissionFactorRequest request
    ) {

        EmissionFactor factor = getEmissionFactorById(id);


        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new RuntimeException("Category not found")
                );


        factor.setCategory(category);
        factor.setActivityType(request.getActivityType());
        factor.setUnit(request.getUnit());
        factor.setEmissionFactor(request.getEmissionFactor());
        factor.setStatus(request.getStatus());


        return mapToResponse(repository.save(factor));
    }


    @Override
    public void deleteEmissionFactor(Long id) {

        EmissionFactor factor = getEmissionFactorById(id);

        repository.delete(factor);
    }


    private EmissionFactorResponse mapToResponse(
            EmissionFactor factor
    ) {

        return EmissionFactorResponse.builder()
                .id(factor.getId())
                .categoryId(factor.getCategory().getId())
                .categoryName(factor.getCategory().getName())
                .activityType(factor.getActivityType())
                .unit(factor.getUnit())
                .emissionFactor(factor.getEmissionFactor())
                .status(factor.getStatus())
                .build();
    }

}