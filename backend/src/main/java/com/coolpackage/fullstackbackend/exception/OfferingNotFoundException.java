package com.coolpackage.fullstackbackend.exception;


public class OfferingNotFoundException extends RuntimeException {
    public OfferingNotFoundException(Long id) {
        super("Could not find the offering with id " + id);
    }
}
