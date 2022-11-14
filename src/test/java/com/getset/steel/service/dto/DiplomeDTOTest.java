package com.getset.steel.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.getset.steel.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DiplomeDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DiplomeDTO.class);
        DiplomeDTO diplomeDTO1 = new DiplomeDTO();
        diplomeDTO1.setId(1L);
        DiplomeDTO diplomeDTO2 = new DiplomeDTO();
        assertThat(diplomeDTO1).isNotEqualTo(diplomeDTO2);
        diplomeDTO2.setId(diplomeDTO1.getId());
        assertThat(diplomeDTO1).isEqualTo(diplomeDTO2);
        diplomeDTO2.setId(2L);
        assertThat(diplomeDTO1).isNotEqualTo(diplomeDTO2);
        diplomeDTO1.setId(null);
        assertThat(diplomeDTO1).isNotEqualTo(diplomeDTO2);
    }
}
