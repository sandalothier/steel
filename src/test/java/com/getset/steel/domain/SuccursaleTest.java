package com.getset.steel.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.getset.steel.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SuccursaleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Succursale.class);
        Succursale succursale1 = new Succursale();
        succursale1.setId(1L);
        Succursale succursale2 = new Succursale();
        succursale2.setId(succursale1.getId());
        assertThat(succursale1).isEqualTo(succursale2);
        succursale2.setId(2L);
        assertThat(succursale1).isNotEqualTo(succursale2);
        succursale1.setId(null);
        assertThat(succursale1).isNotEqualTo(succursale2);
    }
}
