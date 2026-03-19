package com.cp317.group9.campus_cafe.service;

import com.cp317.group9.campus_cafe.model.MenuItem;
import java.util.List;

public interface MenuServiceInterface {
    List<MenuItem> getAll();
    MenuItem create(MenuItem item);
    MenuItem update(Long id, MenuItem updated);
    void delete(Long id);
}
