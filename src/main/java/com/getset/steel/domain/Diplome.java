package com.getset.steel.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Diplome entity.\n@author sanda
 */
@Entity
@Table(name = "diplome")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "diplome")
public class Diplome implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 25)
    @Column(name = "code_diplome", length = 25, nullable = false)
    private String codeDiplome;

    @Column(name = "int_diplome")
    private String intDiplome;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Diplome id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeDiplome() {
        return this.codeDiplome;
    }

    public Diplome codeDiplome(String codeDiplome) {
        this.setCodeDiplome(codeDiplome);
        return this;
    }

    public void setCodeDiplome(String codeDiplome) {
        this.codeDiplome = codeDiplome;
    }

    public String getIntDiplome() {
        return this.intDiplome;
    }

    public Diplome intDiplome(String intDiplome) {
        this.setIntDiplome(intDiplome);
        return this;
    }

    public void setIntDiplome(String intDiplome) {
        this.intDiplome = intDiplome;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Diplome)) {
            return false;
        }
        return id != null && id.equals(((Diplome) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Diplome{" +
            "id=" + getId() +
            ", codeDiplome='" + getCodeDiplome() + "'" +
            ", intDiplome='" + getIntDiplome() + "'" +
            "}";
    }
}
