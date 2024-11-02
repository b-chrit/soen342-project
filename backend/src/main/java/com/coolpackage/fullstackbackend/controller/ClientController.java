package com.coolpackage.fullstackbackend.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.coolpackage.fullstackbackend.exception.ClientNotFoundException;
import com.coolpackage.fullstackbackend.exception.OfferingNotFoundException;
import com.coolpackage.fullstackbackend.model.Booking;
import com.coolpackage.fullstackbackend.model.Client;
import com.coolpackage.fullstackbackend.model.Offering;
import com.coolpackage.fullstackbackend.repository.BookingRepository;
import com.coolpackage.fullstackbackend.repository.ClientRepository;
import com.coolpackage.fullstackbackend.repository.OfferingRepository;

@RestController
@CrossOrigin("http://localhost:3000")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;
    
    @Autowired
    private OfferingRepository offeringRepository;
    
    @Autowired
    private BookingRepository bookingRepository;

    // Get all clients
    @GetMapping("/clients")
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    // Get client by ID
    @GetMapping("/client/{id}")
    public Client getClientById(@PathVariable Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException(id));
    }

    // Register a new client
    @PostMapping("/client/signup")
    public Long signupClient(@RequestBody Client newClient) {
        Client savedClient = clientRepository.save(newClient);
        return savedClient.getId();
    }

    // Update a client
    @PutMapping("/client/{id}")
    public Client updateClient(@RequestBody Client newClient, @PathVariable Long id) {
        return clientRepository.findById(id)
                .map(client -> {
                    client.setName(newClient.getName());
                    client.setPassword(newClient.getPassword());
                    client.setPhoneNumber(newClient.getPhoneNumber());
                    client.setAge(newClient.getAge());
                    client.setGuardian(newClient.getGuardian());
                    return clientRepository.save(client);
                }).orElseThrow(() -> new ClientNotFoundException(id));
    }

    // Delete a client
    @DeleteMapping("/client/{id}")
    public String deleteClient(@PathVariable Long id) {
        if (!clientRepository.existsById(id)) {
            throw new ClientNotFoundException(id);
        }
        clientRepository.deleteById(id);
        return "Client with id " + id + " has been deleted successfully.";
    }

    // Login a client (based on name and password)
    @PostMapping("/client/login")
    public Long loginClient(@RequestBody Client loginDetails) {
        Client foundClient = clientRepository.findByName(loginDetails.getName())
                .orElseThrow(() -> new ClientNotFoundException("Invalid name or password"));

        // Check if the password matches
        if (!foundClient.getPassword().equals(loginDetails.getPassword())) {
            throw new ClientNotFoundException("Invalid name or password");
        }

        return foundClient.getId(); // Return the client ID
    }

// Make a booking for a client
@PostMapping("/client/{clientId}/make-booking")
public ResponseEntity<String> makeBooking(@PathVariable Long clientId, @RequestBody Long offeringId) {
    // Find the client by ID
    Client client = clientRepository.findById(clientId)
            .orElseThrow(() -> new ClientNotFoundException(clientId));

    // Find the offering by ID
    Offering offering = offeringRepository.findById(offeringId)
            .orElseThrow(() -> new OfferingNotFoundException(offeringId));

    // Check for conflicting bookings (same date and time)
    LocalDate offeringDate = offering.getStartDate();  // The date of the offering
    LocalTime offeringTime = offering.getTime();       // The time of the offering

    List<Booking> conflictingBookings = bookingRepository.findByClientIdAndBookingDateAndTime(clientId, offeringDate, offeringTime);
    if (!conflictingBookings.isEmpty()) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Client already has a booking on the same date and time.");
    }

    // Create a new booking if no conflicts
    Booking newBooking = new Booking();
    newBooking.setClient(client);
    newBooking.setOffering(offering);
    newBooking.setBookingDate(LocalDate.now());  // Set booking date to current date
    newBooking.setStatus("Confirmed");

    // Save the booking to the repository
    bookingRepository.save(newBooking);

    // Mark the offering as non-available
    offering.setAvailable(false);
    offeringRepository.save(offering);

    return ResponseEntity.ok("Booking successfully created.");
}

    
    

    // Get all bookings for a client
    @GetMapping("/client/{clientId}/bookings")
    public Set<Booking> getClientBookings(@PathVariable Long clientId) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new ClientNotFoundException(clientId));

        return client.getBookings(); 
    }

    // Get all assigned offerings (available to clients)
    @GetMapping("/client/{clientId}/offerings")
    public List<Offering> getAssignedOfferingsForClient(@PathVariable Long clientId) {
        // Ensure the client exists
        clientRepository.findById(clientId)
                .orElseThrow(() -> new ClientNotFoundException(clientId));

        // Return only offerings that are assigned to an instructor
        return offeringRepository.findByIsAssigned(true);
    }
}