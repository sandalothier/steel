package com.getset.steel.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import com.getset.steel.domain.Succursale;
import com.getset.steel.repository.SuccursaleRepository;
import com.getset.steel.repository.search.SuccursaleSearchRepository;
import com.getset.steel.service.SuccursaleService;
import com.getset.steel.service.dto.SuccursaleDTO;
import com.getset.steel.service.mapper.SuccursaleMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Succursale}.
 */
@Service
@Transactional
public class SuccursaleServiceImpl implements SuccursaleService {

    private final Logger log = LoggerFactory.getLogger(SuccursaleServiceImpl.class);

    private final SuccursaleRepository succursaleRepository;

    private final SuccursaleMapper succursaleMapper;

    private final SuccursaleSearchRepository succursaleSearchRepository;

    public SuccursaleServiceImpl(
        SuccursaleRepository succursaleRepository,
        SuccursaleMapper succursaleMapper,
        SuccursaleSearchRepository succursaleSearchRepository
    ) {
        this.succursaleRepository = succursaleRepository;
        this.succursaleMapper = succursaleMapper;
        this.succursaleSearchRepository = succursaleSearchRepository;
    }

    @Override
    public SuccursaleDTO save(SuccursaleDTO succursaleDTO) {
        log.debug("Request to save Succursale : {}", succursaleDTO);
        Succursale succursale = succursaleMapper.toEntity(succursaleDTO);
        succursale = succursaleRepository.save(succursale);
        SuccursaleDTO result = succursaleMapper.toDto(succursale);
        succursaleSearchRepository.index(succursale);
        return result;
    }

    @Override
    public SuccursaleDTO update(SuccursaleDTO succursaleDTO) {
        log.debug("Request to save Succursale : {}", succursaleDTO);
        Succursale succursale = succursaleMapper.toEntity(succursaleDTO);
        succursale = succursaleRepository.save(succursale);
        SuccursaleDTO result = succursaleMapper.toDto(succursale);
        succursaleSearchRepository.index(succursale);
        return result;
    }

    @Override
    public Optional<SuccursaleDTO> partialUpdate(SuccursaleDTO succursaleDTO) {
        log.debug("Request to partially update Succursale : {}", succursaleDTO);

        return succursaleRepository
            .findById(succursaleDTO.getId())
            .map(existingSuccursale -> {
                succursaleMapper.partialUpdate(existingSuccursale, succursaleDTO);

                return existingSuccursale;
            })
            .map(succursaleRepository::save)
            .map(savedSuccursale -> {
                succursaleSearchRepository.save(savedSuccursale);

                return savedSuccursale;
            })
            .map(succursaleMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SuccursaleDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Succursales");
        return succursaleRepository.findAll(pageable).map(succursaleMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<SuccursaleDTO> findOne(Long id) {
        log.debug("Request to get Succursale : {}", id);
        return succursaleRepository.findById(id).map(succursaleMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Succursale : {}", id);
        succursaleRepository.deleteById(id);
        succursaleSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SuccursaleDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Succursales for query {}", query);
        return succursaleSearchRepository.search(query, pageable).map(succursaleMapper::toDto);
    }
}
