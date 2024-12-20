package com.example.backend.Repository;

import com.example.backend.Model.CompanyModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<CompanyModel, Integer> {
}
