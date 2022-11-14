package com.getset.steel.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * ComposantDocument entity.\n@author sanda
 */
@Entity
@Table(name = "composant_document")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "composantdocument")
public class ComposantDocument implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 25)
    @Column(name = "int_composant", length = 25, nullable = false)
    private String intComposant;

    @Size(max = 50)
    @Column(name = "titre_composant", length = 50)
    private String titreComposant;

    @Column(name = "contenu")
    private String contenu;

    @ManyToOne
    @JsonIgnoreProperties(value = { "composantDocuments", "societe" }, allowSetters = true)
    private TypeDocument intTypeDoc;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ComposantDocument id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIntComposant() {
        return this.intComposant;
    }

    public ComposantDocument intComposant(String intComposant) {
        this.setIntComposant(intComposant);
        return this;
    }

    public void setIntComposant(String intComposant) {
        this.intComposant = intComposant;
    }

    public String getTitreComposant() {
        return this.titreComposant;
    }

    public ComposantDocument titreComposant(String titreComposant) {
        this.setTitreComposant(titreComposant);
        return this;
    }

    public void setTitreComposant(String titreComposant) {
        this.titreComposant = titreComposant;
    }

    public String getContenu() {
        return this.contenu;
    }

    public ComposantDocument contenu(String contenu) {
        this.setContenu(contenu);
        return this;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    public TypeDocument getIntTypeDoc() {
        return this.intTypeDoc;
    }

    public void setIntTypeDoc(TypeDocument typeDocument) {
        this.intTypeDoc = typeDocument;
    }

    public ComposantDocument intTypeDoc(TypeDocument typeDocument) {
        this.setIntTypeDoc(typeDocument);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ComposantDocument)) {
            return false;
        }
        return id != null && id.equals(((ComposantDocument) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ComposantDocument{" +
            "id=" + getId() +
            ", intComposant='" + getIntComposant() + "'" +
            ", titreComposant='" + getTitreComposant() + "'" +
            ", contenu='" + getContenu() + "'" +
            "}";
    }
}
