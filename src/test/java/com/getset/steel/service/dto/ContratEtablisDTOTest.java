package com.getset.steel.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.getset.steel.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ContratEtablisDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContratEtablisDTO.class);
        ContratEtablisDTO contratEtablisDTO1 = new ContratEtablisDTO();
        contratEtablisDTO1.setId(1L);
        ContratEtablisDTO contratEtablisDTO2 = new ContratEtablisDTO();
        assertThat(contratEtablisDTO1).isNotEqualTo(contratEtablisDTO2);
        contratEtablisDTO2.setId(contratEtablisDTO1.getId());
        assertThat(contratEtablisDTO1).isEqualTo(contratEtablisDTO2);
        contratEtablisDTO2.setId(2L);
        assertThat(contratEtablisDTO1).isNotEqualTo(contratEtablisDTO2);
        contratEtablisDTO1.setId(null);
        assertThat(contratEtablisDTO1).isNotEqualTo(contratEtablisDTO2);
    }
}
