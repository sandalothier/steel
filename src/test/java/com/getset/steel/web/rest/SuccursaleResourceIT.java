package com.getset.steel.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.awaitility.Awaitility.await;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.getset.steel.IntegrationTest;
import com.getset.steel.domain.Succursale;
import com.getset.steel.repository.SuccursaleRepository;
import com.getset.steel.repository.search.SuccursaleSearchRepository;
import com.getset.steel.service.dto.SuccursaleDTO;
import com.getset.steel.service.mapper.SuccursaleMapper;
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
 * Integration tests for the {@link SuccursaleResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SuccursaleResourceIT {

    private static final String DEFAULT_INT_SUCCURSALE = "AAAAAAAAAA";
    private static final String UPDATED_INT_SUCCURSALE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/succursales";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";
    private static final String ENTITY_SEARCH_API_URL = "/api/_search/succursales";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SuccursaleRepository succursaleRepository;

    @Autowired
    private SuccursaleMapper succursaleMapper;

    @Autowired
    private SuccursaleSearchRepository succursaleSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSuccursaleMockMvc;

    private Succursale succursale;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Succursale createEntity(EntityManager em) {
        Succursale succursale = new Succursale().intSuccursale(DEFAULT_INT_SUCCURSALE);
        return succursale;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Succursale createUpdatedEntity(EntityManager em) {
        Succursale succursale = new Succursale().intSuccursale(UPDATED_INT_SUCCURSALE);
        return succursale;
    }

    @BeforeEach
    public void initTest() {
        succursaleSearchRepository.deleteAll();
        succursale = createEntity(em);
    }

    @Test
    @Transactional
    void createSuccursale() throws Exception {
        int databaseSizeBeforeCreate = succursaleRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
        // Create the Succursale
        SuccursaleDTO succursaleDTO = succursaleMapper.toDto(succursale);
        restSuccursaleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(succursaleDTO)))
            .andExpect(status().isCreated());

        // Validate the Succursale in the database
        List<Succursale> succursaleList = succursaleRepository.findAll();
        assertThat(succursaleList).hasSize(databaseSizeBeforeCreate + 1);
        await()
            .atMost(5, TimeUnit.SECONDS)
            .untilAsserted(() -> {
                int searchDatabaseSizeAfter = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
                assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore + 1);
            });
        Succursale testSuccursale = succursaleList.get(succursaleList.size() - 1);
        assertThat(testSuccursale.getIntSuccursale()).isEqualTo(DEFAULT_INT_SUCCURSALE);
    }

    @Test
    @Transactional
    void createSuccursaleWithExistingId() throws Exception {
        // Create the Succursale with an existing ID
        succursale.setId(1L);
        SuccursaleDTO succursaleDTO = succursaleMapper.toDto(succursale);

        int databaseSizeBeforeCreate = succursaleRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(succursaleSearchRepository.findAll());

        // An entity with an existing ID cannot be created, so this API call must fail
        restSuccursaleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(succursaleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Succursale in the database
        List<Succursale> succursaleList = succursaleRepository.findAll();
        assertThat(succursaleList).hasSize(databaseSizeBeforeCreate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void checkIntSuccursaleIsRequired() throws Exception {
        int databaseSizeBeforeTest = succursaleRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
        // set the field null
        succursale.setIntSuccursale(null);

        // Create the Succursale, which fails.
        SuccursaleDTO succursaleDTO = succursaleMapper.toDto(succursale);

        restSuccursaleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(succursaleDTO)))
            .andExpect(status().isBadRequest());

        List<Succursale> succursaleList = succursaleRepository.findAll();
        assertThat(succursaleList).hasSize(databaseSizeBeforeTest);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void getAllSuccursales() throws Exception {
        // Initialize the database
        succursaleRepository.saveAndFlush(succursale);

        // Get all the succursaleList
        restSuccursaleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(succursale.getId().intValue())))
            .andExpect(jsonPath("$.[*].intSuccursale").value(hasItem(DEFAULT_INT_SUCCURSALE)));
    }

    @Test
    @Transactional
    void getSuccursale() throws Exception {
        // Initialize the database
        succursaleRepository.saveAndFlush(succursale);

        // Get the succursale
        restSuccursaleMockMvc
            .perform(get(ENTITY_API_URL_ID, succursale.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(succursale.getId().intValue()))
            .andExpect(jsonPath("$.intSuccursale").value(DEFAULT_INT_SUCCURSALE));
    }

    @Test
    @Transactional
    void getNonExistingSuccursale() throws Exception {
        // Get the succursale
        restSuccursaleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewSuccursale() throws Exception {
        // Initialize the database
        succursaleRepository.saveAndFlush(succursale);

        int databaseSizeBeforeUpdate = succursaleRepository.findAll().size();
        succursaleSearchRepository.save(succursale);
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(succursaleSearchRepository.findAll());

        // Update the succursale
        Succursale updatedSuccursale = succursaleRepository.findById(succursale.getId()).get();
        // Disconnect from session so that the updates on updatedSuccursale are not directly saved in db
        em.detach(updatedSuccursale);
        updatedSuccursale.intSuccursale(UPDATED_INT_SUCCURSALE);
        SuccursaleDTO succursaleDTO = succursaleMapper.toDto(updatedSuccursale);

        restSuccursaleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, succursaleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(succursaleDTO))
            )
            .andExpect(status().isOk());

        // Validate the Succursale in the database
        List<Succursale> succursaleList = succursaleRepository.findAll();
        assertThat(succursaleList).hasSize(databaseSizeBeforeUpdate);
        Succursale testSuccursale = succursaleList.get(succursaleList.size() - 1);
        assertThat(testSuccursale.getIntSuccursale()).isEqualTo(UPDATED_INT_SUCCURSALE);
        await()
            .atMost(5, TimeUnit.SECONDS)
            .untilAsserted(() -> {
                int searchDatabaseSizeAfter = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
                assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
                List<Succursale> succursaleSearchList = IterableUtils.toList(succursaleSearchRepository.findAll());
                Succursale testSuccursaleSearch = succursaleSearchList.get(searchDatabaseSizeAfter - 1);
                assertThat(testSuccursaleSearch.getIntSuccursale()).isEqualTo(UPDATED_INT_SUCCURSALE);
            });
    }

    @Test
    @Transactional
    void putNonExistingSuccursale() throws Exception {
        int databaseSizeBeforeUpdate = succursaleRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
        succursale.setId(count.incrementAndGet());

        // Create the Succursale
        SuccursaleDTO succursaleDTO = succursaleMapper.toDto(succursale);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSuccursaleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, succursaleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(succursaleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Succursale in the database
        List<Succursale> succursaleList = succursaleRepository.findAll();
        assertThat(succursaleList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void putWithIdMismatchSuccursale() throws Exception {
        int databaseSizeBeforeUpdate = succursaleRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
        succursale.setId(count.incrementAndGet());

        // Create the Succursale
        SuccursaleDTO succursaleDTO = succursaleMapper.toDto(succursale);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSuccursaleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(succursaleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Succursale in the database
        List<Succursale> succursaleList = succursaleRepository.findAll();
        assertThat(succursaleList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSuccursale() throws Exception {
        int databaseSizeBeforeUpdate = succursaleRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
        succursale.setId(count.incrementAndGet());

        // Create the Succursale
        SuccursaleDTO succursaleDTO = succursaleMapper.toDto(succursale);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSuccursaleMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(succursaleDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Succursale in the database
        List<Succursale> succursaleList = succursaleRepository.findAll();
        assertThat(succursaleList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void partialUpdateSuccursaleWithPatch() throws Exception {
        // Initialize the database
        succursaleRepository.saveAndFlush(succursale);

        int databaseSizeBeforeUpdate = succursaleRepository.findAll().size();

        // Update the succursale using partial update
        Succursale partialUpdatedSuccursale = new Succursale();
        partialUpdatedSuccursale.setId(succursale.getId());

        partialUpdatedSuccursale.intSuccursale(UPDATED_INT_SUCCURSALE);

        restSuccursaleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSuccursale.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSuccursale))
            )
            .andExpect(status().isOk());

        // Validate the Succursale in the database
        List<Succursale> succursaleList = succursaleRepository.findAll();
        assertThat(succursaleList).hasSize(databaseSizeBeforeUpdate);
        Succursale testSuccursale = succursaleList.get(succursaleList.size() - 1);
        assertThat(testSuccursale.getIntSuccursale()).isEqualTo(UPDATED_INT_SUCCURSALE);
    }

    @Test
    @Transactional
    void fullUpdateSuccursaleWithPatch() throws Exception {
        // Initialize the database
        succursaleRepository.saveAndFlush(succursale);

        int databaseSizeBeforeUpdate = succursaleRepository.findAll().size();

        // Update the succursale using partial update
        Succursale partialUpdatedSuccursale = new Succursale();
        partialUpdatedSuccursale.setId(succursale.getId());

        partialUpdatedSuccursale.intSuccursale(UPDATED_INT_SUCCURSALE);

        restSuccursaleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSuccursale.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSuccursale))
            )
            .andExpect(status().isOk());

        // Validate the Succursale in the database
        List<Succursale> succursaleList = succursaleRepository.findAll();
        assertThat(succursaleList).hasSize(databaseSizeBeforeUpdate);
        Succursale testSuccursale = succursaleList.get(succursaleList.size() - 1);
        assertThat(testSuccursale.getIntSuccursale()).isEqualTo(UPDATED_INT_SUCCURSALE);
    }

    @Test
    @Transactional
    void patchNonExistingSuccursale() throws Exception {
        int databaseSizeBeforeUpdate = succursaleRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
        succursale.setId(count.incrementAndGet());

        // Create the Succursale
        SuccursaleDTO succursaleDTO = succursaleMapper.toDto(succursale);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSuccursaleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, succursaleDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(succursaleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Succursale in the database
        List<Succursale> succursaleList = succursaleRepository.findAll();
        assertThat(succursaleList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSuccursale() throws Exception {
        int databaseSizeBeforeUpdate = succursaleRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
        succursale.setId(count.incrementAndGet());

        // Create the Succursale
        SuccursaleDTO succursaleDTO = succursaleMapper.toDto(succursale);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSuccursaleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(succursaleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Succursale in the database
        List<Succursale> succursaleList = succursaleRepository.findAll();
        assertThat(succursaleList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSuccursale() throws Exception {
        int databaseSizeBeforeUpdate = succursaleRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
        succursale.setId(count.incrementAndGet());

        // Create the Succursale
        SuccursaleDTO succursaleDTO = succursaleMapper.toDto(succursale);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSuccursaleMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(succursaleDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Succursale in the database
        List<Succursale> succursaleList = succursaleRepository.findAll();
        assertThat(succursaleList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void deleteSuccursale() throws Exception {
        // Initialize the database
        succursaleRepository.saveAndFlush(succursale);
        succursaleRepository.save(succursale);
        succursaleSearchRepository.save(succursale);

        int databaseSizeBeforeDelete = succursaleRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
        assertThat(searchDatabaseSizeBefore).isEqualTo(databaseSizeBeforeDelete);

        // Delete the succursale
        restSuccursaleMockMvc
            .perform(delete(ENTITY_API_URL_ID, succursale.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Succursale> succursaleList = succursaleRepository.findAll();
        assertThat(succursaleList).hasSize(databaseSizeBeforeDelete - 1);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(succursaleSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore - 1);
    }

    @Test
    @Transactional
    void searchSuccursale() throws Exception {
        // Initialize the database
        succursale = succursaleRepository.saveAndFlush(succursale);
        succursaleSearchRepository.save(succursale);

        // Search the succursale
        restSuccursaleMockMvc
            .perform(get(ENTITY_SEARCH_API_URL + "?query=id:" + succursale.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(succursale.getId().intValue())))
            .andExpect(jsonPath("$.[*].intSuccursale").value(hasItem(DEFAULT_INT_SUCCURSALE)));
    }
}
