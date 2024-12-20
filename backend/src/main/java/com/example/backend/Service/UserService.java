package com.example.backend.Service;

import com.example.backend.Model.UserModel;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserModel> getAllUsers(){
        return (List<UserModel>) userRepository.findAll();
    }

    public UserModel getUserById(int id){
        return userRepository.findById(id).orElse(null);
    }

    public UserModel createUser(UserModel user){
        return userRepository.save(user);
    }

    public Optional<UserModel> updateUser(int id , UserModel updatedUser){
        Optional<UserModel> updateCompanyById = userRepository.findById(id);
        if (updateCompanyById.isPresent()) {
            UserModel user = updateCompanyById.get();
            user.setFullname(updatedUser.getFullname());
            userRepository.save(user);
            return Optional.of(user);
        }
        return Optional.empty();
    }

    public boolean deleteUser(int id){
        userRepository.deleteById(id);
        return true;
    }
}
