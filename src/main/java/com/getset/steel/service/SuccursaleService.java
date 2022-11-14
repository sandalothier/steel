package com.getset.steel.service;

import com.getset.steel.service.dto.SuccursaleDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.getset.steel.domain.Succursale}.
 */
public interface SuccursaleService {
    /**
     * Save a succursale.
     *
     * @param succursaleDTO the entity to save.
     * @return the persisted entity.
     */
    SuccursaleDTO save(SuccursaleDTO succursaleDTO);

    /**
     * Updates a succursale.
     *
     * @param succursaleDTO the entity to update.
     * @return the persisted entity.
     */
    SuccursaleDTO update(SuccursaleDTO succursaleDTO);

    /**
     * Partially updates a succursale.
     *
     * @param succursaleDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<SuccursaleDTO> partialUpdate(SuccursaleDTO succursaleDTO);

    /**
     * Get all the succursales.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<SuccursaleDTO> findAll(Pageable pageable);

    /**
     * Get the "id" succursale.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SuccursaleDTO> findOne(Long id);

    /**
     * Delete the "id" succursale.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the succursale corresponding to the query.
     *
     * @param query the query of the search.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<SuccursaleDTO> search(String query, Pageable pageable);
}
