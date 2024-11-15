package com.coolpackage.fullstackbackend.exception;

public class GuardianNotFoundException extends RuntimeException {
    public GuardianNotFoundException(Long id) {
        super("Guardian with ID " + id + " not found");
    }
}