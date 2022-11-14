package com.getset.steel.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import com.getset.steel.domain.TypeDocument;
import com.getset.steel.repository.TypeDocumentRepository;
import com.getset.steel.repository.search.TypeDocumentSearchRepository;
import com.getset.steel.service.TypeDocumentService;
import com.getset.steel.service.dto.TypeDocumentDTO;
import com.getset.steel.service.mapper.TypeDocumentMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link TypeDocument}.
 */
@Service
@Transactional
public class TypeDocumentServiceImpl implements TypeDocumentService {

    private final Logger log = LoggerFactory.getLogger(TypeDocumentServiceImpl.class);

    private final TypeDocumentRepository typeDocumentRepository;

    private final TypeDocumentMapper typeDocumentMapper;

    private final TypeDocumentSearchRepository typeDocumentSearchRepository;

    public TypeDocumentServiceImpl(
        TypeDocumentRepository typeDocumentRepository,
        TypeDocumentMapper typeDocumentMapper,
        TypeDocumentSearchRepository typeDocumentSearchRepository
    ) {
        this.typeDocumentRepository = typeDocumentRepository;
        this.typeDocumentMapper = typeDocumentMapper;
        this.typeDocumentSearchRepository = typeDocumentSearchRepository;
    }

    @Override
    public TypeDocumentDTO save(TypeDocumentDTO typeDocumentDTO) {
        log.debug("Request to save TypeDocument : {}", typeDocumentDTO);
        TypeDocument typeDocument = typeDocumentMapper.toEntity(typeDocumentDTO);
        typeDocument = typeDocumentRepository.save(typeDocument);
        TypeDocumentDTO result = typeDocumentMapper.toDto(typeDocument);
        typeDocumentSearchRepository.index(typeDocument);
        return result;
    }

    @Override
    public TypeDocumentDTO update(TypeDocumentDTO typeDocumentDTO) {
        log.debug("Request to save TypeDocument : {}", typeDocumentDTO);
        TypeDocument typeDocument = typeDocumentMapper.toEntity(typeDocumentDTO);
        typeDocument = typeDocumentRepository.save(typeDocument);
        TypeDocumentDTO result = typeDocumentMapper.toDto(typeDocument);
        typeDocumentSearchRepository.index(typeDocument);
        return result;
    }

    @Override
    public Optional<TypeDocumentDTO> partialUpdate(TypeDocumentDTO typeDocumentDTO) {
        log.debug("Request to partially update TypeDocument : {}", typeDocumentDTO);

        return typeDocumentRepository
            .findById(typeDocumentDTO.getId())
            .map(existingTypeDocument -> {
                typeDocumentMapper.partialUpdate(existingTypeDocument, typeDocumentDTO);

                return existingTypeDocument;
            })
            .map(typeDocumentRepository::save)
            .map(savedTypeDocument -> {
                typeDocumentSearchRepository.save(savedTypeDocument);

                return savedTypeDocument;
            })
            .map(typeDocumentMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TypeDocumentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TypeDocuments");
        return typeDocumentRepository.findAll(pageable).map(typeDocumentMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TypeDocumentDTO> findOne(Long id) {
        log.debug("Request to get TypeDocument : {}", id);
        return typeDocumentRepository.findById(id).map(typeDocumentMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TypeDocument : {}", id);
        typeDocumentRepository.deleteById(id);
        typeDocumentSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TypeDocumentDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of TypeDocuments for query {}", query);
        return typeDocumentSearchRepository.search(query, pageable).map(typeDocumentMapper::toDto);
    }
}
