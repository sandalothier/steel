package com.getset.steel.service.mapper;

import com.getset.steel.domain.TypeContratDeTravail;
import com.getset.steel.service.dto.TypeContratDeTravailDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TypeContratDeTravail} and its DTO {@link TypeContratDeTravailDTO}.
 */
@Mapper(componentModel = "spring")
public interface TypeContratDeTravailMapper extends EntityMapper<TypeContratDeTravailDTO, TypeContratDeTravail> {}
