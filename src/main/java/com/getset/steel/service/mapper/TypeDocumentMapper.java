package com.getset.steel.service.mapper;

import com.getset.steel.domain.Societe;
import com.getset.steel.domain.TypeDocument;
import com.getset.steel.service.dto.SocieteDTO;
import com.getset.steel.service.dto.TypeDocumentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TypeDocument} and its DTO {@link TypeDocumentDTO}.
 */
@Mapper(componentModel = "spring")
public interface TypeDocumentMapper extends EntityMapper<TypeDocumentDTO, TypeDocument> {
    @Mapping(target = "societe", source = "societe", qualifiedByName = "societeId")
    TypeDocumentDTO toDto(TypeDocument s);

    @Named("societeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SocieteDTO toDtoSocieteId(Societe societe);
}
