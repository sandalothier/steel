package com.getset.steel.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.getset.steel.domain.Succursale} entity.
 */
@Schema(description = "Succursale entity.\n@author sanda")
public class SuccursaleDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 25)
    private String intSuccursale;

    private SocieteDTO societe;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIntSuccursale() {
        return intSuccursale;
    }

    public void setIntSuccursale(String intSuccursale) {
        this.intSuccursale = intSuccursale;
    }

    public SocieteDTO getSociete() {
        return societe;
    }

    public void setSociete(SocieteDTO societe) {
        this.societe = societe;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SuccursaleDTO)) {
            return false;
        }

        SuccursaleDTO succursaleDTO = (SuccursaleDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, succursaleDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SuccursaleDTO{" +
            "id=" + getId() +
            ", intSuccursale='" + getIntSuccursale() + "'" +
            ", societe=" + getSociete() +
            "}";
    }
}
