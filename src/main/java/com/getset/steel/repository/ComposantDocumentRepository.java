package com.getset.steel.repository;

import com.getset.steel.domain.ComposantDocument;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ComposantDocument entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComposantDocumentRepository extends JpaRepository<ComposantDocument, Long> {}
