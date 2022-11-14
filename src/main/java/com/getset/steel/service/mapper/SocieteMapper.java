package com.getset.steel.service.mapper;

import com.getset.steel.domain.Societe;
import com.getset.steel.service.dto.SocieteDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Societe} and its DTO {@link SocieteDTO}.
 */
@Mapper(componentModel = "spring")
public interface SocieteMapper extends EntityMapper<SocieteDTO, Societe> {}
