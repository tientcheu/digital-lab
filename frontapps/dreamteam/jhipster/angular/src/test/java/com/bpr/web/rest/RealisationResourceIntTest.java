package com.bpr.web.rest;

import com.bpr.BprApp;

import com.bpr.domain.Realisation;
import com.bpr.repository.RealisationRepository;
import com.bpr.repository.search.RealisationSearchRepository;
import com.bpr.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.bpr.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.bpr.domain.enumeration.ActionType;
/**
 * Test class for the RealisationResource REST controller.
 *
 * @see RealisationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BprApp.class)
public class RealisationResourceIntTest {

    private static final Instant DEFAULT_CREATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_ACTION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ACTION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final ActionType DEFAULT_ACTION_TYPE = ActionType.MANAGEMENT;
    private static final ActionType UPDATED_ACTION_TYPE = ActionType.CONTROL;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private RealisationRepository realisationRepository;

    @Autowired
    private RealisationSearchRepository realisationSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRealisationMockMvc;

    private Realisation realisation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RealisationResource realisationResource = new RealisationResource(realisationRepository, realisationSearchRepository);
        this.restRealisationMockMvc = MockMvcBuilders.standaloneSetup(realisationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Realisation createEntity(EntityManager em) {
        Realisation realisation = new Realisation()
            .creationDate(DEFAULT_CREATION_DATE)
            .actionDate(DEFAULT_ACTION_DATE)
            .actionType(DEFAULT_ACTION_TYPE)
            .description(DEFAULT_DESCRIPTION);
        return realisation;
    }

    @Before
    public void initTest() {
        realisationSearchRepository.deleteAll();
        realisation = createEntity(em);
    }

    @Test
    @Transactional
    public void createRealisation() throws Exception {
        int databaseSizeBeforeCreate = realisationRepository.findAll().size();

        // Create the Realisation
        restRealisationMockMvc.perform(post("/api/realisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(realisation)))
            .andExpect(status().isCreated());

        // Validate the Realisation in the database
        List<Realisation> realisationList = realisationRepository.findAll();
        assertThat(realisationList).hasSize(databaseSizeBeforeCreate + 1);
        Realisation testRealisation = realisationList.get(realisationList.size() - 1);
        assertThat(testRealisation.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testRealisation.getActionDate()).isEqualTo(DEFAULT_ACTION_DATE);
        assertThat(testRealisation.getActionType()).isEqualTo(DEFAULT_ACTION_TYPE);
        assertThat(testRealisation.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the Realisation in Elasticsearch
        Realisation realisationEs = realisationSearchRepository.findOne(testRealisation.getId());
        assertThat(realisationEs).isEqualToIgnoringGivenFields(testRealisation);
    }

    @Test
    @Transactional
    public void createRealisationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = realisationRepository.findAll().size();

        // Create the Realisation with an existing ID
        realisation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRealisationMockMvc.perform(post("/api/realisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(realisation)))
            .andExpect(status().isBadRequest());

        // Validate the Realisation in the database
        List<Realisation> realisationList = realisationRepository.findAll();
        assertThat(realisationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRealisations() throws Exception {
        // Initialize the database
        realisationRepository.saveAndFlush(realisation);

        // Get all the realisationList
        restRealisationMockMvc.perform(get("/api/realisations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(realisation.getId().intValue())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].actionDate").value(hasItem(DEFAULT_ACTION_DATE.toString())))
            .andExpect(jsonPath("$.[*].actionType").value(hasItem(DEFAULT_ACTION_TYPE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getRealisation() throws Exception {
        // Initialize the database
        realisationRepository.saveAndFlush(realisation);

        // Get the realisation
        restRealisationMockMvc.perform(get("/api/realisations/{id}", realisation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(realisation.getId().intValue()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.actionDate").value(DEFAULT_ACTION_DATE.toString()))
            .andExpect(jsonPath("$.actionType").value(DEFAULT_ACTION_TYPE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRealisation() throws Exception {
        // Get the realisation
        restRealisationMockMvc.perform(get("/api/realisations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRealisation() throws Exception {
        // Initialize the database
        realisationRepository.saveAndFlush(realisation);
        realisationSearchRepository.save(realisation);
        int databaseSizeBeforeUpdate = realisationRepository.findAll().size();

        // Update the realisation
        Realisation updatedRealisation = realisationRepository.findOne(realisation.getId());
        // Disconnect from session so that the updates on updatedRealisation are not directly saved in db
        em.detach(updatedRealisation);
        updatedRealisation
            .creationDate(UPDATED_CREATION_DATE)
            .actionDate(UPDATED_ACTION_DATE)
            .actionType(UPDATED_ACTION_TYPE)
            .description(UPDATED_DESCRIPTION);

        restRealisationMockMvc.perform(put("/api/realisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRealisation)))
            .andExpect(status().isOk());

        // Validate the Realisation in the database
        List<Realisation> realisationList = realisationRepository.findAll();
        assertThat(realisationList).hasSize(databaseSizeBeforeUpdate);
        Realisation testRealisation = realisationList.get(realisationList.size() - 1);
        assertThat(testRealisation.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testRealisation.getActionDate()).isEqualTo(UPDATED_ACTION_DATE);
        assertThat(testRealisation.getActionType()).isEqualTo(UPDATED_ACTION_TYPE);
        assertThat(testRealisation.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the Realisation in Elasticsearch
        Realisation realisationEs = realisationSearchRepository.findOne(testRealisation.getId());
        assertThat(realisationEs).isEqualToIgnoringGivenFields(testRealisation);
    }

    @Test
    @Transactional
    public void updateNonExistingRealisation() throws Exception {
        int databaseSizeBeforeUpdate = realisationRepository.findAll().size();

        // Create the Realisation

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRealisationMockMvc.perform(put("/api/realisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(realisation)))
            .andExpect(status().isCreated());

        // Validate the Realisation in the database
        List<Realisation> realisationList = realisationRepository.findAll();
        assertThat(realisationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRealisation() throws Exception {
        // Initialize the database
        realisationRepository.saveAndFlush(realisation);
        realisationSearchRepository.save(realisation);
        int databaseSizeBeforeDelete = realisationRepository.findAll().size();

        // Get the realisation
        restRealisationMockMvc.perform(delete("/api/realisations/{id}", realisation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean realisationExistsInEs = realisationSearchRepository.exists(realisation.getId());
        assertThat(realisationExistsInEs).isFalse();

        // Validate the database is empty
        List<Realisation> realisationList = realisationRepository.findAll();
        assertThat(realisationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchRealisation() throws Exception {
        // Initialize the database
        realisationRepository.saveAndFlush(realisation);
        realisationSearchRepository.save(realisation);

        // Search the realisation
        restRealisationMockMvc.perform(get("/api/_search/realisations?query=id:" + realisation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(realisation.getId().intValue())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].actionDate").value(hasItem(DEFAULT_ACTION_DATE.toString())))
            .andExpect(jsonPath("$.[*].actionType").value(hasItem(DEFAULT_ACTION_TYPE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Realisation.class);
        Realisation realisation1 = new Realisation();
        realisation1.setId(1L);
        Realisation realisation2 = new Realisation();
        realisation2.setId(realisation1.getId());
        assertThat(realisation1).isEqualTo(realisation2);
        realisation2.setId(2L);
        assertThat(realisation1).isNotEqualTo(realisation2);
        realisation1.setId(null);
        assertThat(realisation1).isNotEqualTo(realisation2);
    }
}
