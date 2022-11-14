package com.getset.steel.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import com.getset.steel.domain.TypeContratDeTravail;
import com.getset.steel.repository.TypeContratDeTravailRepository;
import com.getset.steel.repository.search.TypeContratDeTravailSearchRepository;
import com.getset.steel.service.TypeContratDeTravailService;
import com.getset.steel.service.dto.TypeContratDeTravailDTO;
import com.getset.steel.service.mapper.TypeContratDeTravailMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link TypeContratDeTravail}.
 */
@Service
@Transactional
public class TypeContratDeTravailServiceImpl implements TypeContratDeTravailService {

    private final Logger log = LoggerFactory.getLogger(TypeContratDeTravailServiceImpl.class);

    private final TypeContratDeTravailRepository typeContratDeTravailRepository;

    private final TypeContratDeTravailMapper typeContratDeTravailMapper;

    private final TypeContratDeTravailSearchRepository typeContratDeTravailSearchRepository;

    public TypeContratDeTravailServiceImpl(
        TypeContratDeTravailRepository typeContratDeTravailRepository,
        TypeContratDeTravailMapper typeContratDeTravailMapper,
        TypeContratDeTravailSearchRepository typeContratDeTravailSearchRepository
    ) {
        this.typeContratDeTravailRepository = typeContratDeTravailRepository;
        this.typeContratDeTravailMapper = typeContratDeTravailMapper;
        this.typeContratDeTravailSearchRepository = typeContratDeTravailSearchRepository;
    }

    @Override
    public TypeContratDeTravailDTO save(TypeContratDeTravailDTO typeContratDeTravailDTO) {
        log.debug("Request to save TypeContratDeTravail : {}", typeContratDeTravailDTO);
        TypeContratDeTravail typeContratDeTravail = typeContratDeTravailMapper.toEntity(typeContratDeTravailDTO);
        typeContratDeTravail = typeContratDeTravailRepository.save(typeContratDeTravail);
        TypeContratDeTravailDTO result = typeContratDeTravailMapper.toDto(typeContratDeTravail);
        typeContratDeTravailSearchRepository.index(typeContratDeTravail);
        return result;
    }

    @Override
    public TypeContratDeTravailDTO update(TypeContratDeTravailDTO typeContratDeTravailDTO) {
        log.debug("Request to save TypeContratDeTravail : {}", typeContratDeTravailDTO);
        TypeContratDeTravail typeContratDeTravail = typeContratDeTravailMapper.toEntity(typeContratDeTravailDTO);
        typeContratDeTravail = typeContratDeTravailRepository.save(typeContratDeTravail);
        TypeContratDeTravailDTO result = typeContratDeTravailMapper.toDto(typeContratDeTravail);
        typeContratDeTravailSearchRepository.index(typeContratDeTravail);
        return result;
    }

    @Override
    public Optional<TypeContratDeTravailDTO> partialUpdate(TypeContratDeTravailDTO typeContratDeTravailDTO) {
        log.debug("Request to partially update TypeContratDeTravail : {}", typeContratDeTravailDTO);

        return typeContratDeTravailRepository
            .findById(typeContratDeTravailDTO.getId())
            .map(existingTypeContratDeTravail -> {
                typeContratDeTravailMapper.partialUpdate(existingTypeContratDeTravail, typeContratDeTravailDTO);

                return existingTypeContratDeTravail;
            })
            .map(typeContratDeTravailRepository::save)
            .map(savedTypeContratDeTravail -> {
                typeContratDeTravailSearchRepository.save(savedTypeContratDeTravail);

                return savedTypeContratDeTravail;
            })
            .map(typeContratDeTravailMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TypeContratDeTravailDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TypeContratDeTravails");
        return typeContratDeTravailRepository.findAll(pageable).map(typeContratDeTravailMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TypeContratDeTravailDTO> findOne(Long id) {
        log.debug("Request to get TypeContratDeTravail : {}", id);
        return typeContratDeTravailRepository.findById(id).map(typeContratDeTravailMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TypeContratDeTravail : {}", id);
        typeContratDeTravailRepository.deleteById(id);
        typeContratDeTravailSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TypeContratDeTravailDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of TypeContratDeTravails for query {}", query);
        return typeContratDeTravailSearchRepository.search(query, pageable).map(typeContratDeTravailMapper::toDto);
    }
}
