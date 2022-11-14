package com.getset.steel.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.awaitility.Awaitility.await;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.getset.steel.IntegrationTest;
import com.getset.steel.domain.Diplome;
import com.getset.steel.repository.DiplomeRepository;
import com.getset.steel.repository.search.DiplomeSearchRepository;
import com.getset.steel.service.dto.DiplomeDTO;
import com.getset.steel.service.mapper.DiplomeMapper;
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
 * Integration tests for the {@link DiplomeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DiplomeResourceIT {

    private static final String DEFAULT_CODE_DIPLOME = "AAAAAAAAAA";
    private static final String UPDATED_CODE_DIPLOME = "BBBBBBBBBB";

    private static final String DEFAULT_INT_DIPLOME = "AAAAAAAAAA";
    private static final String UPDATED_INT_DIPLOME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/diplomes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";
    private static final String ENTITY_SEARCH_API_URL = "/api/_search/diplomes";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DiplomeRepository diplomeRepository;

    @Autowired
    private DiplomeMapper diplomeMapper;

    @Autowired
    private DiplomeSearchRepository diplomeSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDiplomeMockMvc;

    private Diplome diplome;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Diplome createEntity(EntityManager em) {
        Diplome diplome = new Diplome().codeDiplome(DEFAULT_CODE_DIPLOME).intDiplome(DEFAULT_INT_DIPLOME);
        return diplome;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Diplome createUpdatedEntity(EntityManager em) {
        Diplome diplome = new Diplome().codeDiplome(UPDATED_CODE_DIPLOME).intDiplome(UPDATED_INT_DIPLOME);
        return diplome;
    }

    @BeforeEach
    public void initTest() {
        diplomeSearchRepository.deleteAll();
        diplome = createEntity(em);
    }

    @Test
    @Transactional
    void createDiplome() throws Exception {
        int databaseSizeBeforeCreate = diplomeRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
        // Create the Diplome
        DiplomeDTO diplomeDTO = diplomeMapper.toDto(diplome);
        restDiplomeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(diplomeDTO)))
            .andExpect(status().isCreated());

        // Validate the Diplome in the database
        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeCreate + 1);
        await()
            .atMost(5, TimeUnit.SECONDS)
            .untilAsserted(() -> {
                int searchDatabaseSizeAfter = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
                assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore + 1);
            });
        Diplome testDiplome = diplomeList.get(diplomeList.size() - 1);
        assertThat(testDiplome.getCodeDiplome()).isEqualTo(DEFAULT_CODE_DIPLOME);
        assertThat(testDiplome.getIntDiplome()).isEqualTo(DEFAULT_INT_DIPLOME);
    }

    @Test
    @Transactional
    void createDiplomeWithExistingId() throws Exception {
        // Create the Diplome with an existing ID
        diplome.setId(1L);
        DiplomeDTO diplomeDTO = diplomeMapper.toDto(diplome);

        int databaseSizeBeforeCreate = diplomeRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(diplomeSearchRepository.findAll());

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiplomeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(diplomeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Diplome in the database
        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeCreate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void checkCodeDiplomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = diplomeRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
        // set the field null
        diplome.setCodeDiplome(null);

        // Create the Diplome, which fails.
        DiplomeDTO diplomeDTO = diplomeMapper.toDto(diplome);

        restDiplomeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(diplomeDTO)))
            .andExpect(status().isBadRequest());

        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeTest);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void getAllDiplomes() throws Exception {
        // Initialize the database
        diplomeRepository.saveAndFlush(diplome);

        // Get all the diplomeList
        restDiplomeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diplome.getId().intValue())))
            .andExpect(jsonPath("$.[*].codeDiplome").value(hasItem(DEFAULT_CODE_DIPLOME)))
            .andExpect(jsonPath("$.[*].intDiplome").value(hasItem(DEFAULT_INT_DIPLOME)));
    }

    @Test
    @Transactional
    void getDiplome() throws Exception {
        // Initialize the database
        diplomeRepository.saveAndFlush(diplome);

        // Get the diplome
        restDiplomeMockMvc
            .perform(get(ENTITY_API_URL_ID, diplome.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(diplome.getId().intValue()))
            .andExpect(jsonPath("$.codeDiplome").value(DEFAULT_CODE_DIPLOME))
            .andExpect(jsonPath("$.intDiplome").value(DEFAULT_INT_DIPLOME));
    }

    @Test
    @Transactional
    void getNonExistingDiplome() throws Exception {
        // Get the diplome
        restDiplomeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDiplome() throws Exception {
        // Initialize the database
        diplomeRepository.saveAndFlush(diplome);

        int databaseSizeBeforeUpdate = diplomeRepository.findAll().size();
        diplomeSearchRepository.save(diplome);
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(diplomeSearchRepository.findAll());

        // Update the diplome
        Diplome updatedDiplome = diplomeRepository.findById(diplome.getId()).get();
        // Disconnect from session so that the updates on updatedDiplome are not directly saved in db
        em.detach(updatedDiplome);
        updatedDiplome.codeDiplome(UPDATED_CODE_DIPLOME).intDiplome(UPDATED_INT_DIPLOME);
        DiplomeDTO diplomeDTO = diplomeMapper.toDto(updatedDiplome);

        restDiplomeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, diplomeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(diplomeDTO))
            )
            .andExpect(status().isOk());

        // Validate the Diplome in the database
        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeUpdate);
        Diplome testDiplome = diplomeList.get(diplomeList.size() - 1);
        assertThat(testDiplome.getCodeDiplome()).isEqualTo(UPDATED_CODE_DIPLOME);
        assertThat(testDiplome.getIntDiplome()).isEqualTo(UPDATED_INT_DIPLOME);
        await()
            .atMost(5, TimeUnit.SECONDS)
            .untilAsserted(() -> {
                int searchDatabaseSizeAfter = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
                assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
                List<Diplome> diplomeSearchList = IterableUtils.toList(diplomeSearchRepository.findAll());
                Diplome testDiplomeSearch = diplomeSearchList.get(searchDatabaseSizeAfter - 1);
                assertThat(testDiplomeSearch.getCodeDiplome()).isEqualTo(UPDATED_CODE_DIPLOME);
                assertThat(testDiplomeSearch.getIntDiplome()).isEqualTo(UPDATED_INT_DIPLOME);
            });
    }

    @Test
    @Transactional
    void putNonExistingDiplome() throws Exception {
        int databaseSizeBeforeUpdate = diplomeRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
        diplome.setId(count.incrementAndGet());

        // Create the Diplome
        DiplomeDTO diplomeDTO = diplomeMapper.toDto(diplome);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiplomeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, diplomeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(diplomeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Diplome in the database
        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void putWithIdMismatchDiplome() throws Exception {
        int databaseSizeBeforeUpdate = diplomeRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
        diplome.setId(count.incrementAndGet());

        // Create the Diplome
        DiplomeDTO diplomeDTO = diplomeMapper.toDto(diplome);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDiplomeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(diplomeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Diplome in the database
        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDiplome() throws Exception {
        int databaseSizeBeforeUpdate = diplomeRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
        diplome.setId(count.incrementAndGet());

        // Create the Diplome
        DiplomeDTO diplomeDTO = diplomeMapper.toDto(diplome);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDiplomeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(diplomeDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Diplome in the database
        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void partialUpdateDiplomeWithPatch() throws Exception {
        // Initialize the database
        diplomeRepository.saveAndFlush(diplome);

        int databaseSizeBeforeUpdate = diplomeRepository.findAll().size();

        // Update the diplome using partial update
        Diplome partialUpdatedDiplome = new Diplome();
        partialUpdatedDiplome.setId(diplome.getId());

        restDiplomeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDiplome.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDiplome))
            )
            .andExpect(status().isOk());

        // Validate the Diplome in the database
        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeUpdate);
        Diplome testDiplome = diplomeList.get(diplomeList.size() - 1);
        assertThat(testDiplome.getCodeDiplome()).isEqualTo(DEFAULT_CODE_DIPLOME);
        assertThat(testDiplome.getIntDiplome()).isEqualTo(DEFAULT_INT_DIPLOME);
    }

    @Test
    @Transactional
    void fullUpdateDiplomeWithPatch() throws Exception {
        // Initialize the database
        diplomeRepository.saveAndFlush(diplome);

        int databaseSizeBeforeUpdate = diplomeRepository.findAll().size();

        // Update the diplome using partial update
        Diplome partialUpdatedDiplome = new Diplome();
        partialUpdatedDiplome.setId(diplome.getId());

        partialUpdatedDiplome.codeDiplome(UPDATED_CODE_DIPLOME).intDiplome(UPDATED_INT_DIPLOME);

        restDiplomeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDiplome.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDiplome))
            )
            .andExpect(status().isOk());

        // Validate the Diplome in the database
        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeUpdate);
        Diplome testDiplome = diplomeList.get(diplomeList.size() - 1);
        assertThat(testDiplome.getCodeDiplome()).isEqualTo(UPDATED_CODE_DIPLOME);
        assertThat(testDiplome.getIntDiplome()).isEqualTo(UPDATED_INT_DIPLOME);
    }

    @Test
    @Transactional
    void patchNonExistingDiplome() throws Exception {
        int databaseSizeBeforeUpdate = diplomeRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
        diplome.setId(count.incrementAndGet());

        // Create the Diplome
        DiplomeDTO diplomeDTO = diplomeMapper.toDto(diplome);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiplomeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, diplomeDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(diplomeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Diplome in the database
        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDiplome() throws Exception {
        int databaseSizeBeforeUpdate = diplomeRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
        diplome.setId(count.incrementAndGet());

        // Create the Diplome
        DiplomeDTO diplomeDTO = diplomeMapper.toDto(diplome);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDiplomeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(diplomeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Diplome in the database
        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDiplome() throws Exception {
        int databaseSizeBeforeUpdate = diplomeRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
        diplome.setId(count.incrementAndGet());

        // Create the Diplome
        DiplomeDTO diplomeDTO = diplomeMapper.toDto(diplome);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDiplomeMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(diplomeDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Diplome in the database
        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void deleteDiplome() throws Exception {
        // Initialize the database
        diplomeRepository.saveAndFlush(diplome);
        diplomeRepository.save(diplome);
        diplomeSearchRepository.save(diplome);

        int databaseSizeBeforeDelete = diplomeRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
        assertThat(searchDatabaseSizeBefore).isEqualTo(databaseSizeBeforeDelete);

        // Delete the diplome
        restDiplomeMockMvc
            .perform(delete(ENTITY_API_URL_ID, diplome.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeDelete - 1);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(diplomeSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore - 1);
    }

    @Test
    @Transactional
    void searchDiplome() throws Exception {
        // Initialize the database
        diplome = diplomeRepository.saveAndFlush(diplome);
        diplomeSearchRepository.save(diplome);

        // Search the diplome
        restDiplomeMockMvc
            .perform(get(ENTITY_SEARCH_API_URL + "?query=id:" + diplome.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diplome.getId().intValue())))
            .andExpect(jsonPath("$.[*].codeDiplome").value(hasItem(DEFAULT_CODE_DIPLOME)))
            .andExpect(jsonPath("$.[*].intDiplome").value(hasItem(DEFAULT_INT_DIPLOME)));
    }
}
