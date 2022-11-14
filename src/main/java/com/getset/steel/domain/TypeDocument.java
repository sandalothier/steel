package com.getset.steel.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * TypeDocument entity.\n@author sanda
 */
@Entity
@Table(name = "type_document")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "typedocument")
public class TypeDocument implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(max = 50)
    @Column(name = "int_type_doc", length = 50)
    private String intTypeDoc;

    @OneToMany(mappedBy = "intTypeDoc")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @org.springframework.data.annotation.Transient
    @JsonIgnoreProperties(value = { "intTypeDoc" }, allowSetters = true)
    private Set<ComposantDocument> composantDocuments = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "employes", "typeDocuments", "succursales" }, allowSetters = true)
    private Societe societe;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TypeDocument id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIntTypeDoc() {
        return this.intTypeDoc;
    }

    public TypeDocument intTypeDoc(String intTypeDoc) {
        this.setIntTypeDoc(intTypeDoc);
        return this;
    }

    public void setIntTypeDoc(String intTypeDoc) {
        this.intTypeDoc = intTypeDoc;
    }

    public Set<ComposantDocument> getComposantDocuments() {
        return this.composantDocuments;
    }

    public void setComposantDocuments(Set<ComposantDocument> composantDocuments) {
        if (this.composantDocuments != null) {
            this.composantDocuments.forEach(i -> i.setIntTypeDoc(null));
        }
        if (composantDocuments != null) {
            composantDocuments.forEach(i -> i.setIntTypeDoc(this));
        }
        this.composantDocuments = composantDocuments;
    }

    public TypeDocument composantDocuments(Set<ComposantDocument> composantDocuments) {
        this.setComposantDocuments(composantDocuments);
        return this;
    }

    public TypeDocument addComposantDocument(ComposantDocument composantDocument) {
        this.composantDocuments.add(composantDocument);
        composantDocument.setIntTypeDoc(this);
        return this;
    }

    public TypeDocument removeComposantDocument(ComposantDocument composantDocument) {
        this.composantDocuments.remove(composantDocument);
        composantDocument.setIntTypeDoc(null);
        return this;
    }

    public Societe getSociete() {
        return this.societe;
    }

    public void setSociete(Societe societe) {
        this.societe = societe;
    }

    public TypeDocument societe(Societe societe) {
        this.setSociete(societe);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TypeDocument)) {
            return false;
        }
        return id != null && id.equals(((TypeDocument) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TypeDocument{" +
            "id=" + getId() +
            ", intTypeDoc='" + getIntTypeDoc() + "'" +
            "}";
    }
}
