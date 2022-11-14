package com.getset.steel.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.getset.steel.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ComposantDocumentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComposantDocument.class);
        ComposantDocument composantDocument1 = new ComposantDocument();
        composantDocument1.setId(1L);
        ComposantDocument composantDocument2 = new ComposantDocument();
        composantDocument2.setId(composantDocument1.getId());
        assertThat(composantDocument1).isEqualTo(composantDocument2);
        composantDocument2.setId(2L);
        assertThat(composantDocument1).isNotEqualTo(composantDocument2);
        composantDocument1.setId(null);
        assertThat(composantDocument1).isNotEqualTo(composantDocument2);
    }
}
