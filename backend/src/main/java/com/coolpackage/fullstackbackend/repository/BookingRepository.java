package com.coolpackage.fullstackbackend.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.coolpackage.fullstackbackend.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("SELECT b FROM Booking b WHERE b.client.id = :clientId AND b.offering.startDate = :bookingDate AND b.offering.time = :offeringTime")
    List<Booking> findByClientIdAndBookingDateAndTime(@Param("clientId") Long clientId, @Param("bookingDate") LocalDate bookingDate, @Param("offeringTime") LocalTime offeringTime);
}