package com.getset.steel.service.mapper;

import com.getset.steel.domain.ComposantDocument;
import com.getset.steel.domain.TypeDocument;
import com.getset.steel.service.dto.ComposantDocumentDTO;
import com.getset.steel.service.dto.TypeDocumentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ComposantDocument} and its DTO {@link ComposantDocumentDTO}.
 */
@Mapper(componentModel = "spring")
public interface ComposantDocumentMapper extends EntityMapper<ComposantDocumentDTO, ComposantDocument> {
    @Mapping(target = "intTypeDoc", source = "intTypeDoc", qualifiedByName = "typeDocumentId")
    ComposantDocumentDTO toDto(ComposantDocument s);

    @Named("typeDocumentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TypeDocumentDTO toDtoTypeDocumentId(TypeDocument typeDocument);
}
