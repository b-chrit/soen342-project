package com.coolpackage.fullstackbackend.exception;

public class ClientNotFoundException extends RuntimeException {

    public ClientNotFoundException(Long id) {
        super("Could not find the client with id: " + id);
    }

    public ClientNotFoundException(String message) {
        super(message);
    }
}