package com.cp317.group9.campus_cafe.service;

import com.cp317.group9.campus_cafe.model.MenuItem;
import com.cp317.group9.campus_cafe.repository.MenuItemRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MenuServiceTest {

    @Mock
    private MenuItemRepository menuItemRepository;

    @InjectMocks
    private MenuService menuService;

    @Test
    void testGetAll() {
        MenuItem item = new MenuItem();
        item.setName("Coffee");
        item.setPrice(2.50);

        when(menuItemRepository.findAll()).thenReturn(List.of(item));

        List<MenuItem> result = menuService.getAll();

        assertEquals(1, result.size());
        assertEquals("Coffee", result.get(0).getName());
    }

    @Test
    void testCreate() {
        MenuItem item = new MenuItem();
        item.setName("Bagel");
        item.setPrice(3.00);

        when(menuItemRepository.save(item)).thenReturn(item);

        MenuItem result = menuService.create(item);

        assertEquals("Bagel", result.getName());
        assertEquals(3.00, result.getPrice());
    }

    @Test
    void testDelete() {
        menuService.delete(1L);
        verify(menuItemRepository, times(1)).deleteById(1L);
    }

    @Test
    void testUpdate() {
        MenuItem existing = new MenuItem();
        existing.setName("Coffee");
        existing.setPrice(2.50);

        MenuItem updated = new MenuItem();
        updated.setName("Latte");
        updated.setPrice(4.00);
        updated.setAvailable(true);

        when(menuItemRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(menuItemRepository.save(existing)).thenReturn(existing);

        MenuItem result = menuService.update(1L, updated);

        assertEquals("Latte", result.getName());
        assertEquals(4.00, result.getPrice());
    }
}
