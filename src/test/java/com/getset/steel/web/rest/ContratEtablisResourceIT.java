package com.getset.steel.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.awaitility.Awaitility.await;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.getset.steel.IntegrationTest;
import com.getset.steel.domain.ContratEtablis;
import com.getset.steel.repository.ContratEtablisRepository;
import com.getset.steel.repository.search.ContratEtablisSearchRepository;
import com.getset.steel.service.dto.ContratEtablisDTO;
import com.getset.steel.service.mapper.ContratEtablisMapper;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.apache.commons.collections4.IterableUtils;
import org.assertj.core.util.IterableUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ContratEtablisResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ContratEtablisResourceIT {

    private static final LocalDate DEFAULT_DATE_ETABLISSEMENT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_ETABLISSEMENT = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/contrat-etablis";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";
    private static final String ENTITY_SEARCH_API_URL = "/api/_search/contrat-etablis";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ContratEtablisRepository contratEtablisRepository;

    @Autowired
    private ContratEtablisMapper contratEtablisMapper;

    @Autowired
    private ContratEtablisSearchRepository contratEtablisSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restContratEtablisMockMvc;

    private ContratEtablis contratEtablis;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContratEtablis createEntity(EntityManager em) {
        ContratEtablis contratEtablis = new ContratEtablis().dateEtablissement(DEFAULT_DATE_ETABLISSEMENT);
        return contratEtablis;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContratEtablis createUpdatedEntity(EntityManager em) {
        ContratEtablis contratEtablis = new ContratEtablis().dateEtablissement(UPDATED_DATE_ETABLISSEMENT);
        return contratEtablis;
    }

    @BeforeEach
    public void initTest() {
        contratEtablisSearchRepository.deleteAll();
        contratEtablis = createEntity(em);
    }

    @Test
    @Transactional
    void createContratEtablis() throws Exception {
        int databaseSizeBeforeCreate = contratEtablisRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());
        // Create the ContratEtablis
        ContratEtablisDTO contratEtablisDTO = contratEtablisMapper.toDto(contratEtablis);
        restContratEtablisMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(contratEtablisDTO))
            )
            .andExpect(status().isCreated());

        // Validate the ContratEtablis in the database
        List<ContratEtablis> contratEtablisList = contratEtablisRepository.findAll();
        assertThat(contratEtablisList).hasSize(databaseSizeBeforeCreate + 1);
        await()
            .atMost(5, TimeUnit.SECONDS)
            .untilAsserted(() -> {
                int searchDatabaseSizeAfter = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());
                assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore + 1);
            });
        ContratEtablis testContratEtablis = contratEtablisList.get(contratEtablisList.size() - 1);
        assertThat(testContratEtablis.getDateEtablissement()).isEqualTo(DEFAULT_DATE_ETABLISSEMENT);
    }

    @Test
    @Transactional
    void createContratEtablisWithExistingId() throws Exception {
        // Create the ContratEtablis with an existing ID
        contratEtablis.setId(1L);
        ContratEtablisDTO contratEtablisDTO = contratEtablisMapper.toDto(contratEtablis);

        int databaseSizeBeforeCreate = contratEtablisRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());

        // An entity with an existing ID cannot be created, so this API call must fail
        restContratEtablisMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(contratEtablisDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ContratEtablis in the database
        List<ContratEtablis> contratEtablisList = contratEtablisRepository.findAll();
        assertThat(contratEtablisList).hasSize(databaseSizeBeforeCreate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void getAllContratEtablis() throws Exception {
        // Initialize the database
        contratEtablisRepository.saveAndFlush(contratEtablis);

        // Get all the contratEtablisList
        restContratEtablisMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contratEtablis.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateEtablissement").value(hasItem(DEFAULT_DATE_ETABLISSEMENT.toString())));
    }

    @Test
    @Transactional
    void getContratEtablis() throws Exception {
        // Initialize the database
        contratEtablisRepository.saveAndFlush(contratEtablis);

        // Get the contratEtablis
        restContratEtablisMockMvc
            .perform(get(ENTITY_API_URL_ID, contratEtablis.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(contratEtablis.getId().intValue()))
            .andExpect(jsonPath("$.dateEtablissement").value(DEFAULT_DATE_ETABLISSEMENT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingContratEtablis() throws Exception {
        // Get the contratEtablis
        restContratEtablisMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewContratEtablis() throws Exception {
        // Initialize the database
        contratEtablisRepository.saveAndFlush(contratEtablis);

        int databaseSizeBeforeUpdate = contratEtablisRepository.findAll().size();
        contratEtablisSearchRepository.save(contratEtablis);
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());

        // Update the contratEtablis
        ContratEtablis updatedContratEtablis = contratEtablisRepository.findById(contratEtablis.getId()).get();
        // Disconnect from session so that the updates on updatedContratEtablis are not directly saved in db
        em.detach(updatedContratEtablis);
        updatedContratEtablis.dateEtablissement(UPDATED_DATE_ETABLISSEMENT);
        ContratEtablisDTO contratEtablisDTO = contratEtablisMapper.toDto(updatedContratEtablis);

        restContratEtablisMockMvc
            .perform(
                put(ENTITY_API_URL_ID, contratEtablisDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(contratEtablisDTO))
            )
            .andExpect(status().isOk());

        // Validate the ContratEtablis in the database
        List<ContratEtablis> contratEtablisList = contratEtablisRepository.findAll();
        assertThat(contratEtablisList).hasSize(databaseSizeBeforeUpdate);
        ContratEtablis testContratEtablis = contratEtablisList.get(contratEtablisList.size() - 1);
        assertThat(testContratEtablis.getDateEtablissement()).isEqualTo(UPDATED_DATE_ETABLISSEMENT);
        await()
            .atMost(5, TimeUnit.SECONDS)
            .untilAsserted(() -> {
                int searchDatabaseSizeAfter = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());
                assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
                List<ContratEtablis> contratEtablisSearchList = IterableUtils.toList(contratEtablisSearchRepository.findAll());
                ContratEtablis testContratEtablisSearch = contratEtablisSearchList.get(searchDatabaseSizeAfter - 1);
                assertThat(testContratEtablisSearch.getDateEtablissement()).isEqualTo(UPDATED_DATE_ETABLISSEMENT);
            });
    }

    @Test
    @Transactional
    void putNonExistingContratEtablis() throws Exception {
        int databaseSizeBeforeUpdate = contratEtablisRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());
        contratEtablis.setId(count.incrementAndGet());

        // Create the ContratEtablis
        ContratEtablisDTO contratEtablisDTO = contratEtablisMapper.toDto(contratEtablis);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContratEtablisMockMvc
            .perform(
                put(ENTITY_API_URL_ID, contratEtablisDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(contratEtablisDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ContratEtablis in the database
        List<ContratEtablis> contratEtablisList = contratEtablisRepository.findAll();
        assertThat(contratEtablisList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void putWithIdMismatchContratEtablis() throws Exception {
        int databaseSizeBeforeUpdate = contratEtablisRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());
        contratEtablis.setId(count.incrementAndGet());

        // Create the ContratEtablis
        ContratEtablisDTO contratEtablisDTO = contratEtablisMapper.toDto(contratEtablis);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restContratEtablisMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(contratEtablisDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ContratEtablis in the database
        List<ContratEtablis> contratEtablisList = contratEtablisRepository.findAll();
        assertThat(contratEtablisList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamContratEtablis() throws Exception {
        int databaseSizeBeforeUpdate = contratEtablisRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());
        contratEtablis.setId(count.incrementAndGet());

        // Create the ContratEtablis
        ContratEtablisDTO contratEtablisDTO = contratEtablisMapper.toDto(contratEtablis);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restContratEtablisMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(contratEtablisDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ContratEtablis in the database
        List<ContratEtablis> contratEtablisList = contratEtablisRepository.findAll();
        assertThat(contratEtablisList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void partialUpdateContratEtablisWithPatch() throws Exception {
        // Initialize the database
        contratEtablisRepository.saveAndFlush(contratEtablis);

        int databaseSizeBeforeUpdate = contratEtablisRepository.findAll().size();

        // Update the contratEtablis using partial update
        ContratEtablis partialUpdatedContratEtablis = new ContratEtablis();
        partialUpdatedContratEtablis.setId(contratEtablis.getId());

        partialUpdatedContratEtablis.dateEtablissement(UPDATED_DATE_ETABLISSEMENT);

        restContratEtablisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedContratEtablis.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedContratEtablis))
            )
            .andExpect(status().isOk());

        // Validate the ContratEtablis in the database
        List<ContratEtablis> contratEtablisList = contratEtablisRepository.findAll();
        assertThat(contratEtablisList).hasSize(databaseSizeBeforeUpdate);
        ContratEtablis testContratEtablis = contratEtablisList.get(contratEtablisList.size() - 1);
        assertThat(testContratEtablis.getDateEtablissement()).isEqualTo(UPDATED_DATE_ETABLISSEMENT);
    }

    @Test
    @Transactional
    void fullUpdateContratEtablisWithPatch() throws Exception {
        // Initialize the database
        contratEtablisRepository.saveAndFlush(contratEtablis);

        int databaseSizeBeforeUpdate = contratEtablisRepository.findAll().size();

        // Update the contratEtablis using partial update
        ContratEtablis partialUpdatedContratEtablis = new ContratEtablis();
        partialUpdatedContratEtablis.setId(contratEtablis.getId());

        partialUpdatedContratEtablis.dateEtablissement(UPDATED_DATE_ETABLISSEMENT);

        restContratEtablisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedContratEtablis.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedContratEtablis))
            )
            .andExpect(status().isOk());

        // Validate the ContratEtablis in the database
        List<ContratEtablis> contratEtablisList = contratEtablisRepository.findAll();
        assertThat(contratEtablisList).hasSize(databaseSizeBeforeUpdate);
        ContratEtablis testContratEtablis = contratEtablisList.get(contratEtablisList.size() - 1);
        assertThat(testContratEtablis.getDateEtablissement()).isEqualTo(UPDATED_DATE_ETABLISSEMENT);
    }

    @Test
    @Transactional
    void patchNonExistingContratEtablis() throws Exception {
        int databaseSizeBeforeUpdate = contratEtablisRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());
        contratEtablis.setId(count.incrementAndGet());

        // Create the ContratEtablis
        ContratEtablisDTO contratEtablisDTO = contratEtablisMapper.toDto(contratEtablis);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContratEtablisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, contratEtablisDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(contratEtablisDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ContratEtablis in the database
        List<ContratEtablis> contratEtablisList = contratEtablisRepository.findAll();
        assertThat(contratEtablisList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void patchWithIdMismatchContratEtablis() throws Exception {
        int databaseSizeBeforeUpdate = contratEtablisRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());
        contratEtablis.setId(count.incrementAndGet());

        // Create the ContratEtablis
        ContratEtablisDTO contratEtablisDTO = contratEtablisMapper.toDto(contratEtablis);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restContratEtablisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(contratEtablisDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ContratEtablis in the database
        List<ContratEtablis> contratEtablisList = contratEtablisRepository.findAll();
        assertThat(contratEtablisList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamContratEtablis() throws Exception {
        int databaseSizeBeforeUpdate = contratEtablisRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());
        contratEtablis.setId(count.incrementAndGet());

        // Create the ContratEtablis
        ContratEtablisDTO contratEtablisDTO = contratEtablisMapper.toDto(contratEtablis);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restContratEtablisMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(contratEtablisDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ContratEtablis in the database
        List<ContratEtablis> contratEtablisList = contratEtablisRepository.findAll();
        assertThat(contratEtablisList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void deleteContratEtablis() throws Exception {
        // Initialize the database
        contratEtablisRepository.saveAndFlush(contratEtablis);
        contratEtablisRepository.save(contratEtablis);
        contratEtablisSearchRepository.save(contratEtablis);

        int databaseSizeBeforeDelete = contratEtablisRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());
        assertThat(searchDatabaseSizeBefore).isEqualTo(databaseSizeBeforeDelete);

        // Delete the contratEtablis
        restContratEtablisMockMvc
            .perform(delete(ENTITY_API_URL_ID, contratEtablis.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ContratEtablis> contratEtablisList = contratEtablisRepository.findAll();
        assertThat(contratEtablisList).hasSize(databaseSizeBeforeDelete - 1);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(contratEtablisSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore - 1);
    }

    @Test
    @Transactional
    void searchContratEtablis() throws Exception {
        // Initialize the database
        contratEtablis = contratEtablisRepository.saveAndFlush(contratEtablis);
        contratEtablisSearchRepository.save(contratEtablis);

        // Search the contratEtablis
        restContratEtablisMockMvc
            .perform(get(ENTITY_SEARCH_API_URL + "?query=id:" + contratEtablis.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contratEtablis.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateEtablissement").value(hasItem(DEFAULT_DATE_ETABLISSEMENT.toString())));
    }
}
