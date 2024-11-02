package com.coolpackage.fullstackbackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coolpackage.fullstackbackend.model.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {
    // Custom query to find client by name
    Optional<Client> findByName(String name);
}