package com.bpr.repository.search;

import com.bpr.domain.Realisation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Realisation entity.
 */
public interface RealisationSearchRepository extends ElasticsearchRepository<Realisation, Long> {
}
