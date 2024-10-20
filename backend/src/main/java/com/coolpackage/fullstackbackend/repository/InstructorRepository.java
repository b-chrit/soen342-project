package com.coolpackage.fullstackbackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.coolpackage.fullstackbackend.model.Instructor;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {
    Optional<Instructor> findByName(String name);
}
