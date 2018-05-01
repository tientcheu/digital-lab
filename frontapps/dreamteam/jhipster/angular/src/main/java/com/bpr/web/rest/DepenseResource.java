package com.bpr.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.bpr.domain.Depense;

import com.bpr.repository.DepenseRepository;
import com.bpr.repository.search.DepenseSearchRepository;
import com.bpr.web.rest.errors.BadRequestAlertException;
import com.bpr.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
 * REST controller for managing Depense.
 */
@RestController
@RequestMapping("/api")
public class DepenseResource {

    private final Logger log = LoggerFactory.getLogger(DepenseResource.class);

    private static final String ENTITY_NAME = "depense";

    private final DepenseRepository depenseRepository;

    private final DepenseSearchRepository depenseSearchRepository;

    public DepenseResource(DepenseRepository depenseRepository, DepenseSearchRepository depenseSearchRepository) {
        this.depenseRepository = depenseRepository;
        this.depenseSearchRepository = depenseSearchRepository;
    }

    /**
     * POST  /depenses : Create a new depense.
     *
     * @param depense the depense to create
     * @return the ResponseEntity with status 201 (Created) and with body the new depense, or with status 400 (Bad Request) if the depense has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/depenses")
    @Timed
    public ResponseEntity<Depense> createDepense(@RequestBody Depense depense) throws URISyntaxException {
        log.debug("REST request to save Depense : {}", depense);
        if (depense.getId() != null) {
            throw new BadRequestAlertException("A new depense cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Depense result = depenseRepository.save(depense);
        depenseSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/depenses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /depenses : Updates an existing depense.
     *
     * @param depense the depense to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated depense,
     * or with status 400 (Bad Request) if the depense is not valid,
     * or with status 500 (Internal Server Error) if the depense couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/depenses")
    @Timed
    public ResponseEntity<Depense> updateDepense(@RequestBody Depense depense) throws URISyntaxException {
        log.debug("REST request to update Depense : {}", depense);
        if (depense.getId() == null) {
            return createDepense(depense);
        }
        Depense result = depenseRepository.save(depense);
        depenseSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, depense.getId().toString()))
            .body(result);
    }

    /**
     * GET  /depenses : get all the depenses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of depenses in body
     */
    @GetMapping("/depenses")
    @Timed
    public List<Depense> getAllDepenses() {
        log.debug("REST request to get all Depenses");
        return depenseRepository.findAll();
        }

    /**
     * GET  /depenses/:id : get the "id" depense.
     *
     * @param id the id of the depense to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the depense, or with status 404 (Not Found)
     */
    @GetMapping("/depenses/{id}")
    @Timed
    public ResponseEntity<Depense> getDepense(@PathVariable Long id) {
        log.debug("REST request to get Depense : {}", id);
        Depense depense = depenseRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(depense));
    }

    /**
     * DELETE  /depenses/:id : delete the "id" depense.
     *
     * @param id the id of the depense to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/depenses/{id}")
    @Timed
    public ResponseEntity<Void> deleteDepense(@PathVariable Long id) {
        log.debug("REST request to delete Depense : {}", id);
        depenseRepository.delete(id);
        depenseSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/depenses?query=:query : search for the depense corresponding
     * to the query.
     *
     * @param query the query of the depense search
     * @return the result of the search
     */
    @GetMapping("/_search/depenses")
    @Timed
    public List<Depense> searchDepenses(@RequestParam String query) {
        log.debug("REST request to search Depenses for query {}", query);
        return StreamSupport
            .stream(depenseSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
