package com.getset.steel.service.mapper;

import com.getset.steel.domain.Adresse;
import com.getset.steel.domain.Diplome;
import com.getset.steel.domain.Employe;
import com.getset.steel.domain.Societe;
import com.getset.steel.service.dto.AdresseDTO;
import com.getset.steel.service.dto.DiplomeDTO;
import com.getset.steel.service.dto.EmployeDTO;
import com.getset.steel.service.dto.SocieteDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Employe} and its DTO {@link EmployeDTO}.
 */
@Mapper(componentModel = "spring")
public interface EmployeMapper extends EntityMapper<EmployeDTO, Employe> {
    @Mapping(target = "codeDiplome", source = "codeDiplome", qualifiedByName = "diplomeId")
    @Mapping(target = "cel", source = "cel", qualifiedByName = "adresseId")
    @Mapping(target = "societe", source = "societe", qualifiedByName = "societeId")
    EmployeDTO toDto(Employe s);

    @Named("diplomeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DiplomeDTO toDtoDiplomeId(Diplome diplome);

    @Named("adresseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AdresseDTO toDtoAdresseId(Adresse adresse);

    @Named("societeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SocieteDTO toDtoSocieteId(Societe societe);
}
