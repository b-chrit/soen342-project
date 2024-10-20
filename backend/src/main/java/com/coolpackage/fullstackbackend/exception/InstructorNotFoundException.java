package com.coolpackage.fullstackbackend.exception;

public class InstructorNotFoundException extends RuntimeException {
    public InstructorNotFoundException(Long id) {
        super("Could not find the instructor with id " + id);
    }

    public InstructorNotFoundException(String message) {
        super(message);
    }

}
