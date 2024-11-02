package com.coolpackage.fullstackbackend.exception;

public class BookingNotFoundException extends RuntimeException {
    public BookingNotFoundException(String message) {
        super(message);
    }

    public BookingNotFoundException(Long id) {
        super("Booking with ID " + id + " not found.");
    }
}