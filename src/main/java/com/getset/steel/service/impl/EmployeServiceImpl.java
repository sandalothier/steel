package com.getset.steel.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import com.getset.steel.domain.Employe;
import com.getset.steel.repository.EmployeRepository;
import com.getset.steel.repository.search.EmployeSearchRepository;
import com.getset.steel.service.EmployeService;
import com.getset.steel.service.dto.EmployeDTO;
import com.getset.steel.service.mapper.EmployeMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Employe}.
 */
@Service
@Transactional
public class EmployeServiceImpl implements EmployeService {

    private final Logger log = LoggerFactory.getLogger(EmployeServiceImpl.class);

    private final EmployeRepository employeRepository;

    private final EmployeMapper employeMapper;

    private final EmployeSearchRepository employeSearchRepository;

    public EmployeServiceImpl(
        EmployeRepository employeRepository,
        EmployeMapper employeMapper,
        EmployeSearchRepository employeSearchRepository
    ) {
        this.employeRepository = employeRepository;
        this.employeMapper = employeMapper;
        this.employeSearchRepository = employeSearchRepository;
    }

    @Override
    public EmployeDTO save(EmployeDTO employeDTO) {
        log.debug("Request to save Employe : {}", employeDTO);
        Employe employe = employeMapper.toEntity(employeDTO);
        employe = employeRepository.save(employe);
        EmployeDTO result = employeMapper.toDto(employe);
        employeSearchRepository.index(employe);
        return result;
    }

    @Override
    public EmployeDTO update(EmployeDTO employeDTO) {
        log.debug("Request to save Employe : {}", employeDTO);
        Employe employe = employeMapper.toEntity(employeDTO);
        employe = employeRepository.save(employe);
        EmployeDTO result = employeMapper.toDto(employe);
        employeSearchRepository.index(employe);
        return result;
    }

    @Override
    public Optional<EmployeDTO> partialUpdate(EmployeDTO employeDTO) {
        log.debug("Request to partially update Employe : {}", employeDTO);

        return employeRepository
            .findById(employeDTO.getId())
            .map(existingEmploye -> {
                employeMapper.partialUpdate(existingEmploye, employeDTO);

                return existingEmploye;
            })
            .map(employeRepository::save)
            .map(savedEmploye -> {
                employeSearchRepository.save(savedEmploye);

                return savedEmploye;
            })
            .map(employeMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EmployeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Employes");
        return employeRepository.findAll(pageable).map(employeMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<EmployeDTO> findOne(Long id) {
        log.debug("Request to get Employe : {}", id);
        return employeRepository.findById(id).map(employeMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Employe : {}", id);
        employeRepository.deleteById(id);
        employeSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EmployeDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Employes for query {}", query);
        return employeSearchRepository.search(query, pageable).map(employeMapper::toDto);
    }
}
