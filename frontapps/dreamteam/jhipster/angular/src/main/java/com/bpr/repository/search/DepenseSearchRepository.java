package com.bpr.repository.search;

import com.bpr.domain.Depense;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Depense entity.
 */
public interface DepenseSearchRepository extends ElasticsearchRepository<Depense, Long> {
}
