package com.getset.steel.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import com.getset.steel.domain.Diplome;
import com.getset.steel.repository.DiplomeRepository;
import com.getset.steel.repository.search.DiplomeSearchRepository;
import com.getset.steel.service.DiplomeService;
import com.getset.steel.service.dto.DiplomeDTO;
import com.getset.steel.service.mapper.DiplomeMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Diplome}.
 */
@Service
@Transactional
public class DiplomeServiceImpl implements DiplomeService {

    private final Logger log = LoggerFactory.getLogger(DiplomeServiceImpl.class);

    private final DiplomeRepository diplomeRepository;

    private final DiplomeMapper diplomeMapper;

    private final DiplomeSearchRepository diplomeSearchRepository;

    public DiplomeServiceImpl(
        DiplomeRepository diplomeRepository,
        DiplomeMapper diplomeMapper,
        DiplomeSearchRepository diplomeSearchRepository
    ) {
        this.diplomeRepository = diplomeRepository;
        this.diplomeMapper = diplomeMapper;
        this.diplomeSearchRepository = diplomeSearchRepository;
    }

    @Override
    public DiplomeDTO save(DiplomeDTO diplomeDTO) {
        log.debug("Request to save Diplome : {}", diplomeDTO);
        Diplome diplome = diplomeMapper.toEntity(diplomeDTO);
        diplome = diplomeRepository.save(diplome);
        DiplomeDTO result = diplomeMapper.toDto(diplome);
        diplomeSearchRepository.index(diplome);
        return result;
    }

    @Override
    public DiplomeDTO update(DiplomeDTO diplomeDTO) {
        log.debug("Request to save Diplome : {}", diplomeDTO);
        Diplome diplome = diplomeMapper.toEntity(diplomeDTO);
        diplome = diplomeRepository.save(diplome);
        DiplomeDTO result = diplomeMapper.toDto(diplome);
        diplomeSearchRepository.index(diplome);
        return result;
    }

    @Override
    public Optional<DiplomeDTO> partialUpdate(DiplomeDTO diplomeDTO) {
        log.debug("Request to partially update Diplome : {}", diplomeDTO);

        return diplomeRepository
            .findById(diplomeDTO.getId())
            .map(existingDiplome -> {
                diplomeMapper.partialUpdate(existingDiplome, diplomeDTO);

                return existingDiplome;
            })
            .map(diplomeRepository::save)
            .map(savedDiplome -> {
                diplomeSearchRepository.save(savedDiplome);

                return savedDiplome;
            })
            .map(diplomeMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DiplomeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Diplomes");
        return diplomeRepository.findAll(pageable).map(diplomeMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DiplomeDTO> findOne(Long id) {
        log.debug("Request to get Diplome : {}", id);
        return diplomeRepository.findById(id).map(diplomeMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Diplome : {}", id);
        diplomeRepository.deleteById(id);
        diplomeSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DiplomeDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Diplomes for query {}", query);
        return diplomeSearchRepository.search(query, pageable).map(diplomeMapper::toDto);
    }
}
