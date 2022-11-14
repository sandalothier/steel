package com.getset.steel.service.mapper;

import com.getset.steel.domain.Employe;
import com.getset.steel.domain.Poste;
import com.getset.steel.service.dto.EmployeDTO;
import com.getset.steel.service.dto.PosteDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Poste} and its DTO {@link PosteDTO}.
 */
@Mapper(componentModel = "spring")
public interface PosteMapper extends EntityMapper<PosteDTO, Poste> {
    @Mapping(target = "nomActeur", source = "nomActeur", qualifiedByName = "employeId")
    PosteDTO toDto(Poste s);

    @Named("employeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EmployeDTO toDtoEmployeId(Employe employe);
}
