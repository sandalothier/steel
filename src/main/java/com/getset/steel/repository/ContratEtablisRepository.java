package com.getset.steel.repository;

import com.getset.steel.domain.ContratEtablis;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ContratEtablis entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContratEtablisRepository extends JpaRepository<ContratEtablis, Long> {}
