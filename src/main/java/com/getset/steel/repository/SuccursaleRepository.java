package com.getset.steel.repository;

import com.getset.steel.domain.Succursale;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Succursale entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SuccursaleRepository extends JpaRepository<Succursale, Long> {}
