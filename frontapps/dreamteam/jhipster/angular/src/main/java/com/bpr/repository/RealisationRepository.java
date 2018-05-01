package com.bpr.repository;

import com.bpr.domain.Realisation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Realisation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RealisationRepository extends JpaRepository<Realisation, Long> {

}
