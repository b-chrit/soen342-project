package com.coolpackage.fullstackbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.coolpackage.fullstackbackend.exception.BookingNotFoundException;
import com.coolpackage.fullstackbackend.model.Booking;
import com.coolpackage.fullstackbackend.model.Offering;
import com.coolpackage.fullstackbackend.repository.BookingRepository;
import com.coolpackage.fullstackbackend.repository.OfferingRepository;

@RestController
@CrossOrigin("http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private OfferingRepository offeringRepository;

    // Create a new booking
    @PostMapping("/bookings")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking savedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(savedBooking);
    }

    // Get all bookings
    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Get booking by ID
    @GetMapping("/booking/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new BookingNotFoundException(id));
        return ResponseEntity.ok(booking);
    }

    // Delete a booking
@DeleteMapping("/booking/{id}")
public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
    Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new BookingNotFoundException(id));

    // Retrieve the associated offering and mark it as available
    Offering offering = booking.getOffering();
    if (offering != null) {
        offering.setAvailable(true);
        offeringRepository.save(offering); // Save the updated offering
    }

    // Delete the booking
    bookingRepository.deleteById(id);

    return ResponseEntity.ok("Booking with ID " + id + " has been deleted successfully.");
}
}