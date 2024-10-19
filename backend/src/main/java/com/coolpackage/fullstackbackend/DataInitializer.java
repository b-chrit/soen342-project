package com.coolpackage.fullstackbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.coolpackage.fullstackbackend.model.Admin;
import com.coolpackage.fullstackbackend.model.Instructor;
import com.coolpackage.fullstackbackend.model.Offering;
import com.coolpackage.fullstackbackend.repository.AdminRepository;
import com.coolpackage.fullstackbackend.repository.InstructorRepository;
import com.coolpackage.fullstackbackend.repository.OfferingRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private OfferingRepository offeringRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if any data exists in the Admin table
        if (adminRepository.count() == 0) {
            adminRepository.save(new Admin("admin", "admin123"));
        }

        // Check if any data exists in the Instructor table
        if (instructorRepository.count() == 0) {
            instructorRepository.save(new Instructor("John Doe", "555-1001", "Swimming", "Montreal, Laval", "swimjohn123"));
            instructorRepository.save(new Instructor("Jane Smith", "555-1002", "Yoga", "Montreal, Laval", "yogajane123"));
            instructorRepository.save(new Instructor("Michael Johnson", "555-1003", "Dance", "Montreal", "dancejohnson123"));
            instructorRepository.save(new Instructor("Emily Davis", "555-1004", "Boxing", "Laval", "boxemily123"));
            instructorRepository.save(new Instructor("Chris Lee", "555-1005", "Tennis", "Montreal", "tennischris123"));
            instructorRepository.save(new Instructor("Sarah Brown", "555-1006", "Gymnastics", "Laval", "gymsarah123"));
            instructorRepository.save(new Instructor("James Wilson", "555-1007", "Running", "Montreal", "runjames123"));
            instructorRepository.save(new Instructor("Olivia White", "555-1008", "Basketball", "Montreal, Laval", "basketolivia123"));
            instructorRepository.save(new Instructor("Daniel Miller", "555-1009", "Football", "Montreal", "footballdan123"));
            instructorRepository.save(new Instructor("instructor", "555-1010", "Volleyball", "Laval", "instructor123"));
        }

        // Check if any data exists in the Offering table
        if (offeringRepository.count() == 0) {
            offeringRepository.save(new Offering("EV-Building Room 7", "Montreal", "12:00:00", "Group", 60, "2024-09-01", "2024-09-30"));
            offeringRepository.save(new Offering("Laval Sports Center", "Laval", "09:00:00", "Private", 90, "2024-10-01", "2024-11-30"));
            offeringRepository.save(new Offering("Montreal Gym", "Montreal", "15:00:00", "Group", 45, "2024-09-15", "2024-12-15"));
            offeringRepository.save(new Offering("Laval Yoga Studio", "Laval", "08:00:00", "Private", 60, "2024-10-10", "2024-12-01"));
            offeringRepository.save(new Offering("Montreal Dance Academy", "Montreal", "14:00:00", "Group", 120, "2024-09-20", "2024-10-20"));
            offeringRepository.save(new Offering("Laval Tennis Courts", "Laval", "10:00:00", "Private", 60, "2024-09-10", "2024-10-10"));
            offeringRepository.save(new Offering("Montreal Boxing Arena", "Montreal", "18:00:00", "Group", 90, "2024-11-01", "2024-12-01"));
            offeringRepository.save(new Offering("Laval Running Track", "Laval", "07:00:00", "Private", 30, "2024-09-05", "2024-10-05"));
            offeringRepository.save(new Offering("Montreal Basketball Court", "Montreal", "16:00:00", "Group", 75, "2024-09-25", "2024-10-25"));
            offeringRepository.save(new Offering("Laval Volleyball Center", "Laval", "11:00:00", "Private", 60, "2024-10-15", "2024-11-15"));
        }
    }
}
