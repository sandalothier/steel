package com.getset.steel.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.getset.steel.domain.Poste} entity.
 */
@Schema(description = "Poste entity.\n@author sanda")
public class PosteDTO implements Serializable {

    private Long id;

    @Size(max = 25)
    private String intPoste;

    private EmployeDTO nomActeur;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIntPoste() {
        return intPoste;
    }

    public void setIntPoste(String intPoste) {
        this.intPoste = intPoste;
    }

    public EmployeDTO getNomActeur() {
        return nomActeur;
    }

    public void setNomActeur(EmployeDTO nomActeur) {
        this.nomActeur = nomActeur;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PosteDTO)) {
            return false;
        }

        PosteDTO posteDTO = (PosteDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, posteDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PosteDTO{" +
            "id=" + getId() +
            ", intPoste='" + getIntPoste() + "'" +
            ", nomActeur=" + getNomActeur() +
            "}";
    }
}
