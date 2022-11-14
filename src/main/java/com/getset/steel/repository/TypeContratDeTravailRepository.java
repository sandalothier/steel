package com.getset.steel.repository;

import com.getset.steel.domain.TypeContratDeTravail;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TypeContratDeTravail entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeContratDeTravailRepository extends JpaRepository<TypeContratDeTravail, Long> {}
