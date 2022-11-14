package com.getset.steel.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Poste entity.\n@author sanda
 */
@Entity
@Table(name = "poste")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "poste")
public class Poste implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(max = 25)
    @Column(name = "int_poste", length = 25)
    private String intPoste;

    @ManyToOne
    @JsonIgnoreProperties(value = { "codeDiplome", "cel", "postes", "societe" }, allowSetters = true)
    private Employe nomActeur;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Poste id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIntPoste() {
        return this.intPoste;
    }

    public Poste intPoste(String intPoste) {
        this.setIntPoste(intPoste);
        return this;
    }

    public void setIntPoste(String intPoste) {
        this.intPoste = intPoste;
    }

    public Employe getNomActeur() {
        return this.nomActeur;
    }

    public void setNomActeur(Employe employe) {
        this.nomActeur = employe;
    }

    public Poste nomActeur(Employe employe) {
        this.setNomActeur(employe);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Poste)) {
            return false;
        }
        return id != null && id.equals(((Poste) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Poste{" +
            "id=" + getId() +
            ", intPoste='" + getIntPoste() + "'" +
            "}";
    }
}
