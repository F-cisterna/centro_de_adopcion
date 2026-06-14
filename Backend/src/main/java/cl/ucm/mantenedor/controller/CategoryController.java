package cl.ucm.mantenedor.controller;

import cl.ucm.mantenedor.dto.in.CategoryDtoIn;
import cl.ucm.mantenedor.error.ErrorInfo;
import cl.ucm.mantenedor.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "category")
public class CategoryController {

    @Autowired
    private CategoryService service;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<?> find(@PathVariable int id){
        try{
            return ResponseEntity.ok(service.getById(id));
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorInfo(404, e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody CategoryDtoIn in){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(in));
    }


}
