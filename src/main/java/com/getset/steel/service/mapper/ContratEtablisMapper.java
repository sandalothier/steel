package com.getset.steel.service.mapper;

import com.getset.steel.domain.ContratEtablis;
import com.getset.steel.domain.Employe;
import com.getset.steel.domain.TypeContratDeTravail;
import com.getset.steel.service.dto.ContratEtablisDTO;
import com.getset.steel.service.dto.EmployeDTO;
import com.getset.steel.service.dto.TypeContratDeTravailDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ContratEtablis} and its DTO {@link ContratEtablisDTO}.
 */
@Mapper(componentModel = "spring")
public interface ContratEtablisMapper extends EntityMapper<ContratEtablisDTO, ContratEtablis> {
    @Mapping(target = "nomActeur", source = "nomActeur", qualifiedByName = "employeId")
    @Mapping(target = "intTypeContrat", source = "intTypeContrat", qualifiedByName = "typeContratDeTravailId")
    ContratEtablisDTO toDto(ContratEtablis s);

    @Named("employeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EmployeDTO toDtoEmployeId(Employe employe);

    @Named("typeContratDeTravailId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TypeContratDeTravailDTO toDtoTypeContratDeTravailId(TypeContratDeTravail typeContratDeTravail);
}
