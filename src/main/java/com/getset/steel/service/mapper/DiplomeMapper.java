package com.getset.steel.service.mapper;

import com.getset.steel.domain.Diplome;
import com.getset.steel.service.dto.DiplomeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Diplome} and its DTO {@link DiplomeDTO}.
 */
@Mapper(componentModel = "spring")
public interface DiplomeMapper extends EntityMapper<DiplomeDTO, Diplome> {}
