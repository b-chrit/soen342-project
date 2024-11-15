package com.coolpackage.fullstackbackend.model;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Offering {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String city;      
    private String location;  
    private LocalTime time;   
    private String type;      
    private Integer duration; 
    private LocalDate startDate;  
    private LocalDate endDate;    

    // Field for indicating instructor assignment
    private boolean isAssigned = false;

    // Field for client booking availability
    private boolean available = true;

    // No-argument constructor
    public Offering() {
    }

    // Parameterized constructor
    public Offering(String location, String city, String time, String type, Integer duration, String startDate, String endDate) {
        this.location = location;
        this.city = city;
        this.time = LocalTime.parse(time); // Parsing time string to LocalTime
        this.type = type;
        this.duration = duration;
        this.startDate = LocalDate.parse(startDate); // Parsing date string to LocalDate
        this.endDate = LocalDate.parse(endDate);
        this.isAssigned = false; // Initially, offerings are not assigned to an instructor
        this.available = true; // Initially, offerings are available for client booking
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public boolean isAssigned() {
        return isAssigned;
    }

    public void setAssigned(boolean isAssigned) {
        this.isAssigned = isAssigned;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }
}
