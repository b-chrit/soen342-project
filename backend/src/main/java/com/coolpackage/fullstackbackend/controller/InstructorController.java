package com.coolpackage.fullstackbackend.controller;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.coolpackage.fullstackbackend.exception.InstructorNotFoundException;
import com.coolpackage.fullstackbackend.exception.OfferingNotFoundException;
import com.coolpackage.fullstackbackend.model.Instructor;
import com.coolpackage.fullstackbackend.model.Offering;
import com.coolpackage.fullstackbackend.repository.InstructorRepository;
import com.coolpackage.fullstackbackend.repository.OfferingRepository;

@RestController
@CrossOrigin("http://localhost:3000")
public class InstructorController {

    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private OfferingRepository offeringRepository;

    // Create a new instructor (Sign-up functionality)
    @PostMapping("/instructor/signup")
    public Long signupInstructor(@RequestBody Instructor newInstructor) {
        Instructor savedInstructor = instructorRepository.save(newInstructor);
        return savedInstructor.getId();
    }

    // Get all instructors
    @GetMapping("/instructors")
    public List<Instructor> getAllInstructors() {
        return instructorRepository.findAll();
    }

    // Get instructor by ID
    @GetMapping("/instructor/{id}")
    public Instructor getInstructorById(@PathVariable Long id) {
        return instructorRepository.findById(id)
                .orElseThrow(() -> new InstructorNotFoundException(id));
    }

    // Update an instructor
    @PutMapping("/instructor/{id}")
    public Instructor updateInstructor(@RequestBody Instructor newInstructor, @PathVariable Long id) {
        return instructorRepository.findById(id)
                .map(instructor -> {
                    instructor.setName(newInstructor.getName());
                    instructor.setPhoneNumber(newInstructor.getPhoneNumber());
                    instructor.setSpecialization(newInstructor.getSpecialization());
                    instructor.setAvailability(newInstructor.getAvailability());
                    instructor.setPassword(newInstructor.getPassword());
                    return instructorRepository.save(instructor);
                }).orElseThrow(() -> new InstructorNotFoundException(id));
    }

    // Delete an instructor
    @DeleteMapping("/instructor/{id}")
    public String deleteInstructor(@PathVariable Long id) {
        if (!instructorRepository.existsById(id)) {
            throw new InstructorNotFoundException(id);
        }
        instructorRepository.deleteById(id);
        return "Instructor with id " + id + " has been deleted successfully.";
    }

    // Simple login method (based on name and password)
    @PostMapping("/instructor/login")
    public Long loginInstructor(@RequestBody Instructor loginDetails) {
        Instructor foundInstructor = instructorRepository.findByName(loginDetails.getName())
                .orElseThrow(() -> new InstructorNotFoundException("Invalid name or password"));

        // Check if the password matches
        if (!foundInstructor.getPassword().equals(loginDetails.getPassword())) {
            throw new InstructorNotFoundException("Invalid name or password");
        }

        return foundInstructor.getId(); // Return the instructorId
    }
// Allow instructor to take on multiple offerings with validation
@PutMapping("/instructor/{id}/take-offering")
public Instructor takeOnOffering(@PathVariable Long id, @RequestBody Map<String, Long> request) {
    Long offeringId = request.get("offeringId");

    if (offeringId == null) {
        throw new IllegalArgumentException("Offering ID is required");
    }

    Offering offering = offeringRepository.findById(offeringId)
            .orElseThrow(() -> new OfferingNotFoundException(offeringId));

    return instructorRepository.findById(id)
            .map(instructor -> {
                // Validate if the offering city is in the instructor's availability
                String[] availableCities = instructor.getAvailability().split(","); // Assuming cities are comma-separated
                boolean cityMatches = false;
                for (String city : availableCities) {
                    if (offering.getCity().equalsIgnoreCase(city.trim())) {
                        cityMatches = true;
                        break;
                    }
                }

                if (!cityMatches) {
                    throw new IllegalArgumentException("Offering city is not in the instructor's availability.");
                }

                // Add offering to instructor
                instructor.addOffering(offering);

                // Mark the offering as assigned to an instructor
                offering.setAssigned(true);  // Mark the offering as assigned

                // Save both the offering and instructor changes
                offeringRepository.save(offering);
                return instructorRepository.save(instructor);
            }).orElseThrow(() -> new InstructorNotFoundException(id));
}

    // Get all offerings for a specific instructor
    @GetMapping("/instructor/{id}/offerings")
    public Set<Offering> getOfferingsForInstructor(@PathVariable Long id) {
        Instructor instructor = instructorRepository.findById(id)
                .orElseThrow(() -> new InstructorNotFoundException(id));
        return instructor.getOfferings();  
    }
}
