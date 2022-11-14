package com.getset.steel.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.getset.steel.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ContratEtablisTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContratEtablis.class);
        ContratEtablis contratEtablis1 = new ContratEtablis();
        contratEtablis1.setId(1L);
        ContratEtablis contratEtablis2 = new ContratEtablis();
        contratEtablis2.setId(contratEtablis1.getId());
        assertThat(contratEtablis1).isEqualTo(contratEtablis2);
        contratEtablis2.setId(2L);
        assertThat(contratEtablis1).isNotEqualTo(contratEtablis2);
        contratEtablis1.setId(null);
        assertThat(contratEtablis1).isNotEqualTo(contratEtablis2);
    }
}
