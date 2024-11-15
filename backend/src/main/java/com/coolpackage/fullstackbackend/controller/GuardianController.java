package com.coolpackage.fullstackbackend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coolpackage.fullstackbackend.exception.GuardianNotFoundException;
import com.coolpackage.fullstackbackend.model.Guardian;
import com.coolpackage.fullstackbackend.repository.GuardianRepository;

@RestController
@RequestMapping("/guardians")
@CrossOrigin("http://localhost:3000")
public class GuardianController {

    private final GuardianRepository guardianRepository;

    public GuardianController(GuardianRepository guardianRepository) {
        this.guardianRepository = guardianRepository;
    }

    @GetMapping
    public List<Guardian> getAllGuardians() {
        return guardianRepository.findAll();
    }

    @GetMapping("/{id}")
    public Guardian getGuardianById(@PathVariable Long id) {
        return guardianRepository.findById(id)
                .orElseThrow(() -> new GuardianNotFoundException(id));
    }

    @PostMapping
    public Guardian createGuardian(@RequestBody Guardian guardian) {
        return guardianRepository.save(guardian);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGuardian(@PathVariable Long id) {
        if (!guardianRepository.existsById(id)) {
            throw new GuardianNotFoundException(id);
        }
        guardianRepository.deleteById(id);
        return new ResponseEntity<>("Guardian deleted successfully", HttpStatus.OK);
    }
}