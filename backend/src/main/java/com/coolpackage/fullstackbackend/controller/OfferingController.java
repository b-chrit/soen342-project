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

import com.coolpackage.fullstackbackend.exception.OfferingNotFoundException;
import com.coolpackage.fullstackbackend.model.Offering;
import com.coolpackage.fullstackbackend.repository.OfferingRepository;

@RestController
@CrossOrigin("http://localhost:3000")
public class OfferingController {

    @Autowired
    private OfferingRepository offeringRepository;

    // Create a new offering with validation for uniqueness
    @PostMapping("/offering")
    public String newOffering(@RequestBody Offering newOffering) {
        boolean isOfferingExists = offeringRepository.existsByCityAndLocationAndTimeAndStartDate(
                newOffering.getCity(),
                newOffering.getLocation(),
                newOffering.getTime(),
                newOffering.getStartDate()
        );

        if (isOfferingExists) {
            return "Error: Offering at this location, city, and time already exists!";
        }

        offeringRepository.save(newOffering);
        return "Offering created successfully!";
    }

    // Get all offerings
    @GetMapping("/offerings")
    public List<Offering> getAllOfferings() {
        return offeringRepository.findAll();
    }

    // Get offering by ID
    @GetMapping("/offering/{id}")
    public Offering getOfferingById(@PathVariable Long id) {
        return offeringRepository.findById(id)
                .orElseThrow(() -> new OfferingNotFoundException(id));
    }

    // Update an offering
    @PutMapping("/offering/{id}")
    public Offering updateOffering(@RequestBody Offering newOffering, @PathVariable Long id) {
        return offeringRepository.findById(id)
                .map(offering -> {
                    offering.setCity(newOffering.getCity());
                    offering.setLocation(newOffering.getLocation());
                    offering.setTime(newOffering.getTime());
                    offering.setType(newOffering.getType());
                    offering.setDuration(newOffering.getDuration());
                    offering.setStartDate(newOffering.getStartDate());
                    offering.setEndDate(newOffering.getEndDate());
                    return offeringRepository.save(offering);
                }).orElseThrow(() -> new OfferingNotFoundException(id));
    }

    // Delete an offering
    @DeleteMapping("/offering/{id}")
    public String deleteOffering(@PathVariable Long id) {
        if (!offeringRepository.existsById(id)) {
            throw new OfferingNotFoundException(id);
        }
        offeringRepository.deleteById(id);
        return "Offering with id " + id + " has been deleted successfully.";
    }

    @GetMapping("/offerings/assigned")
public List<Offering> getAssignedOfferings() {
    return offeringRepository.findByIsAssigned(true);
}
}
