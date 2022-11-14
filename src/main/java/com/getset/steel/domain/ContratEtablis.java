package com.getset.steel.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * ContratEtablis entity.\n@author sanda
 */
@Entity
@Table(name = "contrat_etablis")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "contratetablis")
public class ContratEtablis implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "date_etablissement")
    private LocalDate dateEtablissement;

    @JsonIgnoreProperties(value = { "codeDiplome", "cel", "postes", "societe" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Employe nomActeur;

    @OneToOne
    @JoinColumn(unique = true)
    private TypeContratDeTravail intTypeContrat;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ContratEtablis id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateEtablissement() {
        return this.dateEtablissement;
    }

    public ContratEtablis dateEtablissement(LocalDate dateEtablissement) {
        this.setDateEtablissement(dateEtablissement);
        return this;
    }

    public void setDateEtablissement(LocalDate dateEtablissement) {
        this.dateEtablissement = dateEtablissement;
    }

    public Employe getNomActeur() {
        return this.nomActeur;
    }

    public void setNomActeur(Employe employe) {
        this.nomActeur = employe;
    }

    public ContratEtablis nomActeur(Employe employe) {
        this.setNomActeur(employe);
        return this;
    }

    public TypeContratDeTravail getIntTypeContrat() {
        return this.intTypeContrat;
    }

    public void setIntTypeContrat(TypeContratDeTravail typeContratDeTravail) {
        this.intTypeContrat = typeContratDeTravail;
    }

    public ContratEtablis intTypeContrat(TypeContratDeTravail typeContratDeTravail) {
        this.setIntTypeContrat(typeContratDeTravail);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ContratEtablis)) {
            return false;
        }
        return id != null && id.equals(((ContratEtablis) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ContratEtablis{" +
            "id=" + getId() +
            ", dateEtablissement='" + getDateEtablissement() + "'" +
            "}";
    }
}
