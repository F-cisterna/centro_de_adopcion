package cl.ucm.mantenedor.service;

import cl.ucm.mantenedor.dto.in.CategoryDtoIn;
import cl.ucm.mantenedor.dto.out.CategoryDtoOut;

import java.util.List;

public interface CategoryService {
    List<CategoryDtoOut> getAll();
    CategoryDtoOut getById(int id);
    CategoryDtoOut create(CategoryDtoIn in);
    CategoryDtoOut edit(int id, CategoryDtoIn in);
    void delete(int id);

}
