package com.getset.steel.service.mapper;

import com.getset.steel.domain.Societe;
import com.getset.steel.domain.Succursale;
import com.getset.steel.service.dto.SocieteDTO;
import com.getset.steel.service.dto.SuccursaleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Succursale} and its DTO {@link SuccursaleDTO}.
 */
@Mapper(componentModel = "spring")
public interface SuccursaleMapper extends EntityMapper<SuccursaleDTO, Succursale> {
    @Mapping(target = "societe", source = "societe", qualifiedByName = "societeId")
    SuccursaleDTO toDto(Succursale s);

    @Named("societeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SocieteDTO toDtoSocieteId(Societe societe);
}
