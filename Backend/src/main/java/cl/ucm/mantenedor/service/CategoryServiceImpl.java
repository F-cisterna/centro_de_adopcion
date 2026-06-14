package cl.ucm.mantenedor.service;

import cl.ucm.mantenedor.dto.in.CategoryDtoIn;
import cl.ucm.mantenedor.dto.out.CategoryDtoOut;
import cl.ucm.mantenedor.entities.Category;
import cl.ucm.mantenedor.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository repository;

    private CategoryDtoOut toDto(Category c){
        return new CategoryDtoOut(c.getIdCategory(), c.getName());
    }

    @Override
    public List<CategoryDtoOut> getAll() {
        return repository.findAll()
                .stream()
                .map(c->toDto(c))
                .toList();
    }

    @Override
    public CategoryDtoOut getById(int id) {
        Category category = repository.findById(id).orElseThrow(()->new IllegalArgumentException("id not found"));
        return toDto(category);
    }

    @Override
    public CategoryDtoOut create(CategoryDtoIn in) {
        Category category = new Category();
        category.setName(in.getName());
        return toDto(repository.save(category));
    }

    @Override
    public CategoryDtoOut edit(int id, CategoryDtoIn in) {
        Category category = repository.findById(id).orElseThrow(()->new IllegalArgumentException("id not found"));
        category.setName(in.getName());
        return toDto(repository.save(category));
    }

    @Override
    public void delete(int id) {
        if(!repository.existsById(id)){
            throw new IllegalArgumentException("id not found");
        }
        repository.deleteById(id);
    }
}
