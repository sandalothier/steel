package com.getset.steel.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Succursale entity.\n@author sanda
 */
@Entity
@Table(name = "succursale")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "succursale")
public class Succursale implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 25)
    @Column(name = "int_succursale", length = 25, nullable = false)
    private String intSuccursale;

    @ManyToOne
    @JsonIgnoreProperties(value = { "employes", "typeDocuments", "succursales" }, allowSetters = true)
    private Societe societe;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Succursale id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIntSuccursale() {
        return this.intSuccursale;
    }

    public Succursale intSuccursale(String intSuccursale) {
        this.setIntSuccursale(intSuccursale);
        return this;
    }

    public void setIntSuccursale(String intSuccursale) {
        this.intSuccursale = intSuccursale;
    }

    public Societe getSociete() {
        return this.societe;
    }

    public void setSociete(Societe societe) {
        this.societe = societe;
    }

    public Succursale societe(Societe societe) {
        this.setSociete(societe);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Succursale)) {
            return false;
        }
        return id != null && id.equals(((Succursale) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Succursale{" +
            "id=" + getId() +
            ", intSuccursale='" + getIntSuccursale() + "'" +
            "}";
    }
}
