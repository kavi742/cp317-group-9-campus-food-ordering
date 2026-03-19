package com.cp317.group9.campus_cafe.controller;

import com.cp317.group9.campus_cafe.model.ApiResponse;
import com.cp317.group9.campus_cafe.model.MenuItem;
import com.cp317.group9.campus_cafe.service.MenuServiceInterface;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

    private final MenuServiceInterface menuService;

    public MenuController(MenuServiceInterface menuService) {
        this.menuService = menuService;
    }

    @Operation(summary = "Get all menu items")
    @GetMapping
    public ApiResponse<List<MenuItem>> getAll() {
        return ApiResponse.ok(menuService.getAll());
    }

    @Operation(summary = "Create a new menu item")
    @PostMapping
    public ApiResponse<MenuItem> create(@RequestBody MenuItem item) {
        return ApiResponse.ok(menuService.create(item));
    }

    @Operation(summary = "Update a menu item by id")
    @PutMapping("/{id}")
    public ApiResponse<MenuItem> update(@PathVariable Long id, @RequestBody MenuItem item) {
        return ApiResponse.ok(menuService.update(id, item));
    }

    @Operation(summary = "Delete a menu item by id")
    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        menuService.delete(id);
        return ApiResponse.ok(null);
    }
}
