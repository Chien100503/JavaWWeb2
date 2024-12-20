package com.example.backend.RestController;

import com.example.backend.Model.UserModel;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class RestUserController {
    private final UserService userService;

    @Autowired
    public RestUserController(UserService userService) {
        this.userService = userService;
    }

    //   Rest api
    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public List<UserModel> getAllUser() {
        return userService.getAllUsers();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public ResponseEntity<UserModel> getUserById(@PathVariable("id") int id) {
        UserModel user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody UserModel user) {
        userService.createUser(user);
        return ResponseEntity.ok("User created");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable("id") int id, @RequestBody UserModel user) {
        userService.updateUser(id, user);
        return ResponseEntity.ok("Update successful");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") int id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("Delete successful");
    }
}
