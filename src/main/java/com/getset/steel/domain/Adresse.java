package com.getset.steel.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Adresse entity.\n@author sanda
 */
@Entity
@Table(name = "adresse")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "adresse")
public class Adresse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 8)
    @Column(name = "cel", length = 8, nullable = false)
    private String cel;

    @NotNull
    @Size(max = 8)
    @Column(name = "tel", length = 8, nullable = false)
    private String tel;

    @NotNull
    @Size(max = 25)
    @Column(name = "region", length = 25, nullable = false)
    private String region;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Adresse id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCel() {
        return this.cel;
    }

    public Adresse cel(String cel) {
        this.setCel(cel);
        return this;
    }

    public void setCel(String cel) {
        this.cel = cel;
    }

    public String getTel() {
        return this.tel;
    }

    public Adresse tel(String tel) {
        this.setTel(tel);
        return this;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getRegion() {
        return this.region;
    }

    public Adresse region(String region) {
        this.setRegion(region);
        return this;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Adresse)) {
            return false;
        }
        return id != null && id.equals(((Adresse) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Adresse{" +
            "id=" + getId() +
            ", cel='" + getCel() + "'" +
            ", tel='" + getTel() + "'" +
            ", region='" + getRegion() + "'" +
            "}";
    }
}
