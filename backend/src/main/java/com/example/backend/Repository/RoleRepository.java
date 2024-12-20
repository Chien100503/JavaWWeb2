package com.example.backend.Repository;

import com.example.backend.Model.RoleModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<RoleModel, Integer> {
    RoleModel findByName(String name);
}
