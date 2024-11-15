package com.coolpackage.fullstackbackend.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String password;
    private String phoneNumber;
    private int age;
    private boolean isUnderage;

    // @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "guardian_id")
    private Guardian guardian;

    // @JsonManagedReference
    @JsonIgnoreProperties({"client"})
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private Set<Booking> bookings;

    // Constructors
    public Client() {}

    public Client(String name, String password, String phoneNumber, int age, Set<Booking> bookings) {
        this.name = name;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.age = age;
        this.isUnderage = age < 18;
        this.bookings = bookings;
    }

    public Client(String name, String password, String phoneNumber, int age, Guardian guardian, Set<Booking> bookings) {
        this.name = name;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.age = age;
        this.isUnderage = age < 18;
        this.guardian = guardian;
        this.bookings = bookings;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
        this.isUnderage = age < 18;  // Recalculate underage status based on age
    }

    public boolean isUnderage() {
        return isUnderage;
    }

    public Guardian getGuardian() {
        return guardian;
    }

    public void setGuardian(Guardian guardian) {
        this.guardian = guardian;
    }

    public Set<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(Set<Booking> bookings) {
        this.bookings = bookings;
    }
}