package com.example.backend.Service;

import com.example.backend.Model.CompanyModel;
import com.example.backend.Repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {
    @Autowired
    private CompanyRepository companyRepository;

    public List<CompanyModel> getAllCompanies(){
        return companyRepository.findAll();
    }

    public CompanyModel getCompanyById(int id){
        return companyRepository.findById(id).orElse(null);
    }

    public CompanyModel createCompany(CompanyModel company){
        return companyRepository.save(company);
    }

    public Optional<CompanyModel> updateCompany(int id , CompanyModel updatedCompany){
        Optional<CompanyModel> updateCompanyById = companyRepository.findById(id);
        if (updateCompanyById.isPresent()) {
            CompanyModel company = updateCompanyById.get();
            company.setCompanyName(updatedCompany.getCompanyName());
            companyRepository.save(company);
            return Optional.of(company);
        }
        return Optional.empty();
    }

    public boolean deleteCompany(int id){
        companyRepository.deleteById(id);
        return true;
    }
}
