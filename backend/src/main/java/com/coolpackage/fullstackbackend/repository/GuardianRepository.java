package com.coolpackage.fullstackbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coolpackage.fullstackbackend.model.Guardian;

public interface GuardianRepository extends JpaRepository<Guardian, Long> {
}