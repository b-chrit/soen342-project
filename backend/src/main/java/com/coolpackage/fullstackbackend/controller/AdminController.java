package com.coolpackage.fullstackbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.coolpackage.fullstackbackend.exception.AdminNotFoundException;
import com.coolpackage.fullstackbackend.model.Admin;
import com.coolpackage.fullstackbackend.repository.AdminRepository;

@RestController
@CrossOrigin("http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    // Create a new admin (Sign-up functionality)
    @PostMapping("/admin/signup")
    public Long signupAdmin(@RequestBody Admin newAdmin) {
        Admin savedAdmin = adminRepository.save(newAdmin);
        return savedAdmin.getId();
    }
    // Get all admins
    @GetMapping("/admins")
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // Get admin by ID
    @GetMapping("/admin/{id}")
    public Admin getAdminById(@PathVariable Long id) {
        return adminRepository.findById(id)
                .orElseThrow(() -> new AdminNotFoundException(id));
    }

    // Update an admin
    @PutMapping("/admin/{id}")
    public Admin updateAdmin(@RequestBody Admin newAdmin, @PathVariable Long id) {
        return adminRepository.findById(id)
                .map(admin -> {
                    admin.setName(newAdmin.getName());
                    admin.setPassword(newAdmin.getPassword());
                    return adminRepository.save(admin);
                }).orElseThrow(() -> new AdminNotFoundException(id));
    }

    // Delete an admin
    @DeleteMapping("/admin/{id}")
    public String deleteAdmin(@PathVariable Long id) {
        if (!adminRepository.existsById(id)) {
            throw new AdminNotFoundException(id);
        }
        adminRepository.deleteById(id);
        return "Admin with id " + id + " has been deleted successfully.";
    }

    // Simple login method (returns admin ID on success)
    @PostMapping("/admin/login")
    public Long loginAdmin(@RequestBody Admin loginDetails) {
        Admin foundAdmin = adminRepository.findByName(loginDetails.getName())
                .orElseThrow(() -> new AdminNotFoundException("Invalid name or password"));

        // Check if the password matches
        if (!foundAdmin.getPassword().equals(loginDetails.getPassword())) {
            throw new AdminNotFoundException("Invalid name or password");
        }

        // Return the admin's ID upon successful login
        return foundAdmin.getId();
    }
}
