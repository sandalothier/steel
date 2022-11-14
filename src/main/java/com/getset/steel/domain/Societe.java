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
 * Societe entity.\n@author sanda
 */
@Entity
@Table(name = "societe")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "societe")
public class Societe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 25)
    @Column(name = "int_societe", length = 25, nullable = false)
    private String intSociete;

    @Size(max = 25)
    @Column(name = "sigle", length = 25)
    private String sigle;

    @NotNull
    @Size(max = 25)
    @Column(name = "logo", length = 25, nullable = false)
    private String logo;

    @Column(name = "siege")
    private String siege;

    @OneToMany(mappedBy = "societe")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @org.springframework.data.annotation.Transient
    @JsonIgnoreProperties(value = { "codeDiplome", "cel", "postes", "societe" }, allowSetters = true)
    private Set<Employe> employes = new HashSet<>();

    @OneToMany(mappedBy = "societe")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @org.springframework.data.annotation.Transient
    @JsonIgnoreProperties(value = { "composantDocuments", "societe" }, allowSetters = true)
    private Set<TypeDocument> typeDocuments = new HashSet<>();

    @OneToMany(mappedBy = "societe")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @org.springframework.data.annotation.Transient
    @JsonIgnoreProperties(value = { "societe" }, allowSetters = true)
    private Set<Succursale> succursales = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Societe id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIntSociete() {
        return this.intSociete;
    }

    public Societe intSociete(String intSociete) {
        this.setIntSociete(intSociete);
        return this;
    }

    public void setIntSociete(String intSociete) {
        this.intSociete = intSociete;
    }

    public String getSigle() {
        return this.sigle;
    }

    public Societe sigle(String sigle) {
        this.setSigle(sigle);
        return this;
    }

    public void setSigle(String sigle) {
        this.sigle = sigle;
    }

    public String getLogo() {
        return this.logo;
    }

    public Societe logo(String logo) {
        this.setLogo(logo);
        return this;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getSiege() {
        return this.siege;
    }

    public Societe siege(String siege) {
        this.setSiege(siege);
        return this;
    }

    public void setSiege(String siege) {
        this.siege = siege;
    }

    public Set<Employe> getEmployes() {
        return this.employes;
    }

    public void setEmployes(Set<Employe> employes) {
        if (this.employes != null) {
            this.employes.forEach(i -> i.setSociete(null));
        }
        if (employes != null) {
            employes.forEach(i -> i.setSociete(this));
        }
        this.employes = employes;
    }

    public Societe employes(Set<Employe> employes) {
        this.setEmployes(employes);
        return this;
    }

    public Societe addEmploye(Employe employe) {
        this.employes.add(employe);
        employe.setSociete(this);
        return this;
    }

    public Societe removeEmploye(Employe employe) {
        this.employes.remove(employe);
        employe.setSociete(null);
        return this;
    }

    public Set<TypeDocument> getTypeDocuments() {
        return this.typeDocuments;
    }

    public void setTypeDocuments(Set<TypeDocument> typeDocuments) {
        if (this.typeDocuments != null) {
            this.typeDocuments.forEach(i -> i.setSociete(null));
        }
        if (typeDocuments != null) {
            typeDocuments.forEach(i -> i.setSociete(this));
        }
        this.typeDocuments = typeDocuments;
    }

    public Societe typeDocuments(Set<TypeDocument> typeDocuments) {
        this.setTypeDocuments(typeDocuments);
        return this;
    }

    public Societe addTypeDocument(TypeDocument typeDocument) {
        this.typeDocuments.add(typeDocument);
        typeDocument.setSociete(this);
        return this;
    }

    public Societe removeTypeDocument(TypeDocument typeDocument) {
        this.typeDocuments.remove(typeDocument);
        typeDocument.setSociete(null);
        return this;
    }

    public Set<Succursale> getSuccursales() {
        return this.succursales;
    }

    public void setSuccursales(Set<Succursale> succursales) {
        if (this.succursales != null) {
            this.succursales.forEach(i -> i.setSociete(null));
        }
        if (succursales != null) {
            succursales.forEach(i -> i.setSociete(this));
        }
        this.succursales = succursales;
    }

    public Societe succursales(Set<Succursale> succursales) {
        this.setSuccursales(succursales);
        return this;
    }

    public Societe addSuccursale(Succursale succursale) {
        this.succursales.add(succursale);
        succursale.setSociete(this);
        return this;
    }

    public Societe removeSuccursale(Succursale succursale) {
        this.succursales.remove(succursale);
        succursale.setSociete(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Societe)) {
            return false;
        }
        return id != null && id.equals(((Societe) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Societe{" +
            "id=" + getId() +
            ", intSociete='" + getIntSociete() + "'" +
            ", sigle='" + getSigle() + "'" +
            ", logo='" + getLogo() + "'" +
            ", siege='" + getSiege() + "'" +
            "}";
    }
}
