package com.getset.steel.service.dto;

import com.getset.steel.domain.enumeration.Sexe;
import com.getset.steel.domain.enumeration.SituationMatrimoniale;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import javax.persistence.Lob;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.getset.steel.domain.Employe} entity.
 */
@Schema(description = "Employe entity.\n@author sanda\nCe sont les individus\nCette table extends la table Acteur")
public class EmployeDTO implements Serializable {

    private Long id;

    @NotNull
    private Sexe sexe;

    @NotNull
    @Size(max = 20)
    private String nomActeur;

    @NotNull
    @Size(max = 25)
    private String prenomsActeur;

    private LocalDate dateNaissance;

    @NotNull
    @Size(max = 25)
    private String lieuNaissance;

    private SituationMatrimoniale situationMatrimoniale;

    @Lob
    private byte[] photo;

    private String photoContentType;
    private String paysOrigine;

    private DiplomeDTO codeDiplome;

    private AdresseDTO cel;

    private SocieteDTO societe;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Sexe getSexe() {
        return sexe;
    }

    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }

    public String getNomActeur() {
        return nomActeur;
    }

    public void setNomActeur(String nomActeur) {
        this.nomActeur = nomActeur;
    }

    public String getPrenomsActeur() {
        return prenomsActeur;
    }

    public void setPrenomsActeur(String prenomsActeur) {
        this.prenomsActeur = prenomsActeur;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getLieuNaissance() {
        return lieuNaissance;
    }

    public void setLieuNaissance(String lieuNaissance) {
        this.lieuNaissance = lieuNaissance;
    }

    public SituationMatrimoniale getSituationMatrimoniale() {
        return situationMatrimoniale;
    }

    public void setSituationMatrimoniale(SituationMatrimoniale situationMatrimoniale) {
        this.situationMatrimoniale = situationMatrimoniale;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public String getPaysOrigine() {
        return paysOrigine;
    }

    public void setPaysOrigine(String paysOrigine) {
        this.paysOrigine = paysOrigine;
    }

    public DiplomeDTO getCodeDiplome() {
        return codeDiplome;
    }

    public void setCodeDiplome(DiplomeDTO codeDiplome) {
        this.codeDiplome = codeDiplome;
    }

    public AdresseDTO getCel() {
        return cel;
    }

    public void setCel(AdresseDTO cel) {
        this.cel = cel;
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
        if (!(o instanceof EmployeDTO)) {
            return false;
        }

        EmployeDTO employeDTO = (EmployeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, employeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeDTO{" +
            "id=" + getId() +
            ", sexe='" + getSexe() + "'" +
            ", nomActeur='" + getNomActeur() + "'" +
            ", prenomsActeur='" + getPrenomsActeur() + "'" +
            ", dateNaissance='" + getDateNaissance() + "'" +
            ", lieuNaissance='" + getLieuNaissance() + "'" +
            ", situationMatrimoniale='" + getSituationMatrimoniale() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", paysOrigine='" + getPaysOrigine() + "'" +
            ", codeDiplome=" + getCodeDiplome() +
            ", cel=" + getCel() +
            ", societe=" + getSociete() +
            "}";
    }
}
