package com.getset.steel.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import com.getset.steel.domain.Adresse;
import com.getset.steel.repository.AdresseRepository;
import java.util.List;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.elasticsearch.search.sort.SortBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Spring Data Elasticsearch repository for the {@link Adresse} entity.
 */
public interface AdresseSearchRepository extends ElasticsearchRepository<Adresse, Long>, AdresseSearchRepositoryInternal {}

interface AdresseSearchRepositoryInternal {
    Page<Adresse> search(String query, Pageable pageable);

    Page<Adresse> search(Query query);

    void index(Adresse entity);
}

class AdresseSearchRepositoryInternalImpl implements AdresseSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;
    private final AdresseRepository repository;

    AdresseSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate, AdresseRepository repository) {
        this.elasticsearchTemplate = elasticsearchTemplate;
        this.repository = repository;
    }

    @Override
    public Page<Adresse> search(String query, Pageable pageable) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        return search(nativeSearchQuery.setPageable(pageable));
    }

    @Override
    public Page<Adresse> search(Query query) {
        SearchHits<Adresse> searchHits = elasticsearchTemplate.search(query, Adresse.class);
        List<Adresse> hits = searchHits.map(SearchHit::getContent).stream().collect(Collectors.toList());
        return new PageImpl<>(hits, query.getPageable(), searchHits.getTotalHits());
    }

    @Override
    public void index(Adresse entity) {
        repository.findById(entity.getId()).ifPresent(elasticsearchTemplate::save);
    }
}
