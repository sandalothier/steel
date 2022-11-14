package com.getset.steel.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.getset.steel.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SuccursaleDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SuccursaleDTO.class);
        SuccursaleDTO succursaleDTO1 = new SuccursaleDTO();
        succursaleDTO1.setId(1L);
        SuccursaleDTO succursaleDTO2 = new SuccursaleDTO();
        assertThat(succursaleDTO1).isNotEqualTo(succursaleDTO2);
        succursaleDTO2.setId(succursaleDTO1.getId());
        assertThat(succursaleDTO1).isEqualTo(succursaleDTO2);
        succursaleDTO2.setId(2L);
        assertThat(succursaleDTO1).isNotEqualTo(succursaleDTO2);
        succursaleDTO1.setId(null);
        assertThat(succursaleDTO1).isNotEqualTo(succursaleDTO2);
    }
}
