package com.coolpackage.fullstackbackend.exception;

public class AdminNotFoundException extends RuntimeException {
    public AdminNotFoundException(Long id) {
        super("Could not find the admin with id " + id);
    }

    public AdminNotFoundException(String message) {
        super(message);
    }
}
