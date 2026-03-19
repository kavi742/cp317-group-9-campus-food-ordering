package com.cp317.group9.campus_cafe.service;

import com.cp317.group9.campus_cafe.model.MenuItem;
import com.cp317.group9.campus_cafe.repository.MenuItemRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MenuService implements MenuServiceInterface {

    private final MenuItemRepository menuItemRepository;

    public MenuService(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    @Override
    public List<MenuItem> getAll() {
        return menuItemRepository.findAll();
    }

    @Override
    public MenuItem create(MenuItem item) {
        return menuItemRepository.save(item);
    }

    @Override
    public MenuItem update(Long id, MenuItem updated) {
        MenuItem existing = menuItemRepository.findById(id).orElseThrow();
        existing.setName(updated.getName());
        existing.setCategory(updated.getCategory());
        existing.setPrice(updated.getPrice());
        existing.setQuantity(updated.getQuantity());
        existing.setDescription(updated.getDescription());
        existing.setAvailable(updated.isAvailable());
        return menuItemRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        menuItemRepository.deleteById(id);
    }
}
