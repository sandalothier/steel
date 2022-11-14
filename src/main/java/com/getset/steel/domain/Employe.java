package com.getset.steel.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.getset.steel.domain.enumeration.Sexe;
import com.getset.steel.domain.enumeration.SituationMatrimoniale;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Employe entity.\n@author sanda\nCe sont les individus\nCette table extends la table Acteur
 */
@Entity
@Table(name = "employe")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "employe")
public class Employe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "sexe", nullable = false)
    private Sexe sexe;

    @NotNull
    @Size(max = 20)
    @Column(name = "nom_acteur", length = 20, nullable = false)
    private String nomActeur;

    @NotNull
    @Size(max = 25)
    @Column(name = "prenoms_acteur", length = 25, nullable = false)
    private String prenomsActeur;

    @Column(name = "date_naissance")
    private LocalDate dateNaissance;

    @NotNull
    @Size(max = 25)
    @Column(name = "lieu_naissance", length = 25, nullable = false)
    private String lieuNaissance;

    @Enumerated(EnumType.STRING)
    @Column(name = "situation_matrimoniale")
    private SituationMatrimoniale situationMatrimoniale;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @Column(name = "pays_origine")
    private String paysOrigine;

    @OneToOne
    @JoinColumn(unique = true)
    private Diplome codeDiplome;

    @OneToOne
    @JoinColumn(unique = true)
    private Adresse cel;

    @OneToMany(mappedBy = "nomActeur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @org.springframework.data.annotation.Transient
    @JsonIgnoreProperties(value = { "nomActeur" }, allowSetters = true)
    private Set<Poste> postes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "employes", "typeDocuments", "succursales" }, allowSetters = true)
    private Societe societe;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Employe id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Sexe getSexe() {
        return this.sexe;
    }

    public Employe sexe(Sexe sexe) {
        this.setSexe(sexe);
        return this;
    }

    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }

    public String getNomActeur() {
        return this.nomActeur;
    }

    public Employe nomActeur(String nomActeur) {
        this.setNomActeur(nomActeur);
        return this;
    }

    public void setNomActeur(String nomActeur) {
        this.nomActeur = nomActeur;
    }

    public String getPrenomsActeur() {
        return this.prenomsActeur;
    }

    public Employe prenomsActeur(String prenomsActeur) {
        this.setPrenomsActeur(prenomsActeur);
        return this;
    }

    public void setPrenomsActeur(String prenomsActeur) {
        this.prenomsActeur = prenomsActeur;
    }

    public LocalDate getDateNaissance() {
        return this.dateNaissance;
    }

    public Employe dateNaissance(LocalDate dateNaissance) {
        this.setDateNaissance(dateNaissance);
        return this;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getLieuNaissance() {
        return this.lieuNaissance;
    }

    public Employe lieuNaissance(String lieuNaissance) {
        this.setLieuNaissance(lieuNaissance);
        return this;
    }

    public void setLieuNaissance(String lieuNaissance) {
        this.lieuNaissance = lieuNaissance;
    }

    public SituationMatrimoniale getSituationMatrimoniale() {
        return this.situationMatrimoniale;
    }

    public Employe situationMatrimoniale(SituationMatrimoniale situationMatrimoniale) {
        this.setSituationMatrimoniale(situationMatrimoniale);
        return this;
    }

    public void setSituationMatrimoniale(SituationMatrimoniale situationMatrimoniale) {
        this.situationMatrimoniale = situationMatrimoniale;
    }

    public byte[] getPhoto() {
        return this.photo;
    }

    public Employe photo(byte[] photo) {
        this.setPhoto(photo);
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return this.photoContentType;
    }

    public Employe photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public String getPaysOrigine() {
        return this.paysOrigine;
    }

    public Employe paysOrigine(String paysOrigine) {
        this.setPaysOrigine(paysOrigine);
        return this;
    }

    public void setPaysOrigine(String paysOrigine) {
        this.paysOrigine = paysOrigine;
    }

    public Diplome getCodeDiplome() {
        return this.codeDiplome;
    }

    public void setCodeDiplome(Diplome diplome) {
        this.codeDiplome = diplome;
    }

    public Employe codeDiplome(Diplome diplome) {
        this.setCodeDiplome(diplome);
        return this;
    }

    public Adresse getCel() {
        return this.cel;
    }

    public void setCel(Adresse adresse) {
        this.cel = adresse;
    }

    public Employe cel(Adresse adresse) {
        this.setCel(adresse);
        return this;
    }

    public Set<Poste> getPostes() {
        return this.postes;
    }

    public void setPostes(Set<Poste> postes) {
        if (this.postes != null) {
            this.postes.forEach(i -> i.setNomActeur(null));
        }
        if (postes != null) {
            postes.forEach(i -> i.setNomActeur(this));
        }
        this.postes = postes;
    }

    public Employe postes(Set<Poste> postes) {
        this.setPostes(postes);
        return this;
    }

    public Employe addPoste(Poste poste) {
        this.postes.add(poste);
        poste.setNomActeur(this);
        return this;
    }

    public Employe removePoste(Poste poste) {
        this.postes.remove(poste);
        poste.setNomActeur(null);
        return this;
    }

    public Societe getSociete() {
        return this.societe;
    }

    public void setSociete(Societe societe) {
        this.societe = societe;
    }

    public Employe societe(Societe societe) {
        this.setSociete(societe);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Employe)) {
            return false;
        }
        return id != null && id.equals(((Employe) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Employe{" +
            "id=" + getId() +
            ", sexe='" + getSexe() + "'" +
            ", nomActeur='" + getNomActeur() + "'" +
            ", prenomsActeur='" + getPrenomsActeur() + "'" +
            ", dateNaissance='" + getDateNaissance() + "'" +
            ", lieuNaissance='" + getLieuNaissance() + "'" +
            ", situationMatrimoniale='" + getSituationMatrimoniale() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            ", paysOrigine='" + getPaysOrigine() + "'" +
            "}";
    }
}
