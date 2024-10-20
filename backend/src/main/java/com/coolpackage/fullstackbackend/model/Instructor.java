package com.coolpackage.fullstackbackend.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class Instructor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String phoneNumber;
    private String specialization;
    private String availability;
    private String password;

    // Unidirectional relationship to Offering
    @ManyToMany
    @JoinTable(
        name = "instructor_offering",
        joinColumns = @JoinColumn(name = "instructor_id"),
        inverseJoinColumns = @JoinColumn(name = "offering_id")
    )
    private Set<Offering> offerings = new HashSet<>();

    // No-argument constructor (required by JPA)
    public Instructor() {
    }

    // Constructor with all fields except 'id' and 'offerings'
    public Instructor(String name, String phoneNumber, String specialization, String availability, String password) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.specialization = specialization;
        this.availability = availability;
        this.password = password;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Offering> getOfferings() {
        return offerings;
    }

    public void setOfferings(Set<Offering> offerings) {
        this.offerings = offerings;
    }

    public void addOffering(Offering offering) {
        this.offerings.add(offering);
    }
}
