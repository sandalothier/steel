package com.getset.steel.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import com.getset.steel.domain.Employe;
import com.getset.steel.repository.EmployeRepository;
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
 * Spring Data Elasticsearch repository for the {@link Employe} entity.
 */
public interface EmployeSearchRepository extends ElasticsearchRepository<Employe, Long>, EmployeSearchRepositoryInternal {}

interface EmployeSearchRepositoryInternal {
    Page<Employe> search(String query, Pageable pageable);

    Page<Employe> search(Query query);

    void index(Employe entity);
}

class EmployeSearchRepositoryInternalImpl implements EmployeSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;
    private final EmployeRepository repository;

    EmployeSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate, EmployeRepository repository) {
        this.elasticsearchTemplate = elasticsearchTemplate;
        this.repository = repository;
    }

    @Override
    public Page<Employe> search(String query, Pageable pageable) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        return search(nativeSearchQuery.setPageable(pageable));
    }

    @Override
    public Page<Employe> search(Query query) {
        SearchHits<Employe> searchHits = elasticsearchTemplate.search(query, Employe.class);
        List<Employe> hits = searchHits.map(SearchHit::getContent).stream().collect(Collectors.toList());
        return new PageImpl<>(hits, query.getPageable(), searchHits.getTotalHits());
    }

    @Override
    public void index(Employe entity) {
        repository.findById(entity.getId()).ifPresent(elasticsearchTemplate::save);
    }
}
