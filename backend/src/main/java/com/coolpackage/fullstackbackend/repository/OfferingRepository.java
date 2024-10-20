package com.coolpackage.fullstackbackend.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coolpackage.fullstackbackend.model.Offering;

public interface OfferingRepository extends JpaRepository<Offering, Long> {
    boolean existsByCityAndLocationAndTimeAndStartDate(String city, String location, LocalTime time, LocalDate startDate);
    List<Offering> findByIsAssigned(boolean isAssigned);
}
