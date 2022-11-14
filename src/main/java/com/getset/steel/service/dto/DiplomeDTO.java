package com.getset.steel.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.getset.steel.domain.Diplome} entity.
 */
@Schema(description = "Diplome entity.\n@author sanda")
public class DiplomeDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 25)
    private String codeDiplome;

    private String intDiplome;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeDiplome() {
        return codeDiplome;
    }

    public void setCodeDiplome(String codeDiplome) {
        this.codeDiplome = codeDiplome;
    }

    public String getIntDiplome() {
        return intDiplome;
    }

    public void setIntDiplome(String intDiplome) {
        this.intDiplome = intDiplome;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DiplomeDTO)) {
            return false;
        }

        DiplomeDTO diplomeDTO = (DiplomeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, diplomeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DiplomeDTO{" +
            "id=" + getId() +
            ", codeDiplome='" + getCodeDiplome() + "'" +
            ", intDiplome='" + getIntDiplome() + "'" +
            "}";
    }
}
