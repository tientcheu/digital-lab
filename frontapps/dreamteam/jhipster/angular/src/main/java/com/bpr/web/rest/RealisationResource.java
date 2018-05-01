package com.bpr.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.bpr.domain.Realisation;

import com.bpr.repository.RealisationRepository;
import com.bpr.repository.search.RealisationSearchRepository;
import com.bpr.web.rest.errors.BadRequestAlertException;
import com.bpr.web.rest.util.HeaderUtil;
import com.bpr.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Realisation.
 */
@RestController
@RequestMapping("/api")
public class RealisationResource {

    private final Logger log = LoggerFactory.getLogger(RealisationResource.class);

    private static final String ENTITY_NAME = "realisation";

    private final RealisationRepository realisationRepository;

    private final RealisationSearchRepository realisationSearchRepository;

    public RealisationResource(RealisationRepository realisationRepository, RealisationSearchRepository realisationSearchRepository) {
        this.realisationRepository = realisationRepository;
        this.realisationSearchRepository = realisationSearchRepository;
    }

    /**
     * POST  /realisations : Create a new realisation.
     *
     * @param realisation the realisation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new realisation, or with status 400 (Bad Request) if the realisation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/realisations")
    @Timed
    public ResponseEntity<Realisation> createRealisation(@RequestBody Realisation realisation) throws URISyntaxException {
        log.debug("REST request to save Realisation : {}", realisation);
        if (realisation.getId() != null) {
            throw new BadRequestAlertException("A new realisation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Realisation result = realisationRepository.save(realisation);
        realisationSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/realisations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /realisations : Updates an existing realisation.
     *
     * @param realisation the realisation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated realisation,
     * or with status 400 (Bad Request) if the realisation is not valid,
     * or with status 500 (Internal Server Error) if the realisation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/realisations")
    @Timed
    public ResponseEntity<Realisation> updateRealisation(@RequestBody Realisation realisation) throws URISyntaxException {
        log.debug("REST request to update Realisation : {}", realisation);
        if (realisation.getId() == null) {
            return createRealisation(realisation);
        }
        Realisation result = realisationRepository.save(realisation);
        realisationSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, realisation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /realisations : get all the realisations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of realisations in body
     */
    @GetMapping("/realisations")
    @Timed
    public ResponseEntity<List<Realisation>> getAllRealisations(Pageable pageable) {
        log.debug("REST request to get a page of Realisations");
        Page<Realisation> page = realisationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/realisations");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /realisations/:id : get the "id" realisation.
     *
     * @param id the id of the realisation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the realisation, or with status 404 (Not Found)
     */
    @GetMapping("/realisations/{id}")
    @Timed
    public ResponseEntity<Realisation> getRealisation(@PathVariable Long id) {
        log.debug("REST request to get Realisation : {}", id);
        Realisation realisation = realisationRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(realisation));
    }

    /**
     * DELETE  /realisations/:id : delete the "id" realisation.
     *
     * @param id the id of the realisation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/realisations/{id}")
    @Timed
    public ResponseEntity<Void> deleteRealisation(@PathVariable Long id) {
        log.debug("REST request to delete Realisation : {}", id);
        realisationRepository.delete(id);
        realisationSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/realisations?query=:query : search for the realisation corresponding
     * to the query.
     *
     * @param query the query of the realisation search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/realisations")
    @Timed
    public ResponseEntity<List<Realisation>> searchRealisations(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Realisations for query {}", query);
        Page<Realisation> page = realisationSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/realisations");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
