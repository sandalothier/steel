package com.getset.steel.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import com.getset.steel.domain.ContratEtablis;
import com.getset.steel.repository.ContratEtablisRepository;
import com.getset.steel.repository.search.ContratEtablisSearchRepository;
import com.getset.steel.service.ContratEtablisService;
import com.getset.steel.service.dto.ContratEtablisDTO;
import com.getset.steel.service.mapper.ContratEtablisMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ContratEtablis}.
 */
@Service
@Transactional
public class ContratEtablisServiceImpl implements ContratEtablisService {

    private final Logger log = LoggerFactory.getLogger(ContratEtablisServiceImpl.class);

    private final ContratEtablisRepository contratEtablisRepository;

    private final ContratEtablisMapper contratEtablisMapper;

    private final ContratEtablisSearchRepository contratEtablisSearchRepository;

    public ContratEtablisServiceImpl(
        ContratEtablisRepository contratEtablisRepository,
        ContratEtablisMapper contratEtablisMapper,
        ContratEtablisSearchRepository contratEtablisSearchRepository
    ) {
        this.contratEtablisRepository = contratEtablisRepository;
        this.contratEtablisMapper = contratEtablisMapper;
        this.contratEtablisSearchRepository = contratEtablisSearchRepository;
    }

    @Override
    public ContratEtablisDTO save(ContratEtablisDTO contratEtablisDTO) {
        log.debug("Request to save ContratEtablis : {}", contratEtablisDTO);
        ContratEtablis contratEtablis = contratEtablisMapper.toEntity(contratEtablisDTO);
        contratEtablis = contratEtablisRepository.save(contratEtablis);
        ContratEtablisDTO result = contratEtablisMapper.toDto(contratEtablis);
        contratEtablisSearchRepository.index(contratEtablis);
        return result;
    }

    @Override
    public ContratEtablisDTO update(ContratEtablisDTO contratEtablisDTO) {
        log.debug("Request to save ContratEtablis : {}", contratEtablisDTO);
        ContratEtablis contratEtablis = contratEtablisMapper.toEntity(contratEtablisDTO);
        contratEtablis = contratEtablisRepository.save(contratEtablis);
        ContratEtablisDTO result = contratEtablisMapper.toDto(contratEtablis);
        contratEtablisSearchRepository.index(contratEtablis);
        return result;
    }

    @Override
    public Optional<ContratEtablisDTO> partialUpdate(ContratEtablisDTO contratEtablisDTO) {
        log.debug("Request to partially update ContratEtablis : {}", contratEtablisDTO);

        return contratEtablisRepository
            .findById(contratEtablisDTO.getId())
            .map(existingContratEtablis -> {
                contratEtablisMapper.partialUpdate(existingContratEtablis, contratEtablisDTO);

                return existingContratEtablis;
            })
            .map(contratEtablisRepository::save)
            .map(savedContratEtablis -> {
                contratEtablisSearchRepository.save(savedContratEtablis);

                return savedContratEtablis;
            })
            .map(contratEtablisMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ContratEtablisDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ContratEtablis");
        return contratEtablisRepository.findAll(pageable).map(contratEtablisMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ContratEtablisDTO> findOne(Long id) {
        log.debug("Request to get ContratEtablis : {}", id);
        return contratEtablisRepository.findById(id).map(contratEtablisMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ContratEtablis : {}", id);
        contratEtablisRepository.deleteById(id);
        contratEtablisSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ContratEtablisDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of ContratEtablis for query {}", query);
        return contratEtablisSearchRepository.search(query, pageable).map(contratEtablisMapper::toDto);
    }
}
