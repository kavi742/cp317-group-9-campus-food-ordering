package com.cp317.group9.campus_cafe.controller;

import com.cp317.group9.campus_cafe.model.MenuItem;
import com.cp317.group9.campus_cafe.service.MenuService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @Operation(summary="Get all menu items")
    @GetMapping
    public List<MenuItem> getAll() {
        return menuService.getAll();
    }

    @Operation(summary="Create a new menu item by id")
    @PostMapping
    public MenuItem create(@RequestBody MenuItem item) {
        return menuService.create(item);
    }

    @Operation(summary="Update a menu item by id")
    @PutMapping("/{id}")
    public MenuItem update(@PathVariable Long id, @RequestBody MenuItem item) {
        return menuService.update(id, item);
    }

    @Operation(summary="Delete a menu item")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        menuService.delete(id);
    }
}
