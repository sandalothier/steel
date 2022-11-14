package com.getset.steel.service;

import com.getset.steel.service.dto.SocieteDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.getset.steel.domain.Societe}.
 */
public interface SocieteService {
    /**
     * Save a societe.
     *
     * @param societeDTO the entity to save.
     * @return the persisted entity.
     */
    SocieteDTO save(SocieteDTO societeDTO);

    /**
     * Updates a societe.
     *
     * @param societeDTO the entity to update.
     * @return the persisted entity.
     */
    SocieteDTO update(SocieteDTO societeDTO);

    /**
     * Partially updates a societe.
     *
     * @param societeDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<SocieteDTO> partialUpdate(SocieteDTO societeDTO);

    /**
     * Get all the societes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<SocieteDTO> findAll(Pageable pageable);

    /**
     * Get the "id" societe.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SocieteDTO> findOne(Long id);

    /**
     * Delete the "id" societe.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the societe corresponding to the query.
     *
     * @param query the query of the search.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<SocieteDTO> search(String query, Pageable pageable);
}
