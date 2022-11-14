package com.getset.steel.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link com.getset.steel.domain.ContratEtablis} entity.
 */
@Schema(description = "ContratEtablis entity.\n@author sanda")
public class ContratEtablisDTO implements Serializable {

    private Long id;

    private LocalDate dateEtablissement;

    private EmployeDTO nomActeur;

    private TypeContratDeTravailDTO intTypeContrat;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateEtablissement() {
        return dateEtablissement;
    }

    public void setDateEtablissement(LocalDate dateEtablissement) {
        this.dateEtablissement = dateEtablissement;
    }

    public EmployeDTO getNomActeur() {
        return nomActeur;
    }

    public void setNomActeur(EmployeDTO nomActeur) {
        this.nomActeur = nomActeur;
    }

    public TypeContratDeTravailDTO getIntTypeContrat() {
        return intTypeContrat;
    }

    public void setIntTypeContrat(TypeContratDeTravailDTO intTypeContrat) {
        this.intTypeContrat = intTypeContrat;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ContratEtablisDTO)) {
            return false;
        }

        ContratEtablisDTO contratEtablisDTO = (ContratEtablisDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, contratEtablisDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ContratEtablisDTO{" +
            "id=" + getId() +
            ", dateEtablissement='" + getDateEtablissement() + "'" +
            ", nomActeur=" + getNomActeur() +
            ", intTypeContrat=" + getIntTypeContrat() +
            "}";
    }
}
