package com.getset.steel.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * TypeContratDeTravail entity.\n@author sanda
 */
@Entity
@Table(name = "type_contrat_de_travail")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "typecontratdetravail")
public class TypeContratDeTravail implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(max = 25)
    @Column(name = "int_type_contrat", length = 25)
    private String intTypeContrat;

    @NotNull
    @Size(max = 50)
    @Column(name = "description", length = 50, nullable = false)
    private String description;

    @NotNull
    @Column(name = "duree_max", nullable = false)
    private Integer dureeMax;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TypeContratDeTravail id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIntTypeContrat() {
        return this.intTypeContrat;
    }

    public TypeContratDeTravail intTypeContrat(String intTypeContrat) {
        this.setIntTypeContrat(intTypeContrat);
        return this;
    }

    public void setIntTypeContrat(String intTypeContrat) {
        this.intTypeContrat = intTypeContrat;
    }

    public String getDescription() {
        return this.description;
    }

    public TypeContratDeTravail description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDureeMax() {
        return this.dureeMax;
    }

    public TypeContratDeTravail dureeMax(Integer dureeMax) {
        this.setDureeMax(dureeMax);
        return this;
    }

    public void setDureeMax(Integer dureeMax) {
        this.dureeMax = dureeMax;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TypeContratDeTravail)) {
            return false;
        }
        return id != null && id.equals(((TypeContratDeTravail) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TypeContratDeTravail{" +
            "id=" + getId() +
            ", intTypeContrat='" + getIntTypeContrat() + "'" +
            ", description='" + getDescription() + "'" +
            ", dureeMax=" + getDureeMax() +
            "}";
    }
}
