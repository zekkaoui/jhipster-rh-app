package tech.alphalupi.rhapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import tech.alphalupi.rhapp.domain.enumeration.FaqType;

import tech.alphalupi.rhapp.domain.enumeration.Language;

/**
 * A Faq.
 */
@Entity
@Table(name = "faq")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Faq implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "faq_name", nullable = false)
    private String faqName;

    @Enumerated(EnumType.STRING)
    @Column(name = "faq_type")
    private FaqType faqType;

    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    private Language language;

    @Lob
    @Column(name = "text_response")
    private String textResponse;

    @Column(name = "link_response")
    private String linkResponse;

    @Lob
    @Column(name = "pdf_response")
    private byte[] pdfResponse;

    @Column(name = "pdf_response_content_type")
    private String pdfResponseContentType;

    @ManyToOne
    @JsonIgnoreProperties("faqs")
    private Domain domain;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFaqName() {
        return faqName;
    }

    public Faq faqName(String faqName) {
        this.faqName = faqName;
        return this;
    }

    public void setFaqName(String faqName) {
        this.faqName = faqName;
    }

    public FaqType getFaqType() {
        return faqType;
    }

    public Faq faqType(FaqType faqType) {
        this.faqType = faqType;
        return this;
    }

    public void setFaqType(FaqType faqType) {
        this.faqType = faqType;
    }

    public Language getLanguage() {
        return language;
    }

    public Faq language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public String getTextResponse() {
        return textResponse;
    }

    public Faq textResponse(String textResponse) {
        this.textResponse = textResponse;
        return this;
    }

    public void setTextResponse(String textResponse) {
        this.textResponse = textResponse;
    }

    public String getLinkResponse() {
        return linkResponse;
    }

    public Faq linkResponse(String linkResponse) {
        this.linkResponse = linkResponse;
        return this;
    }

    public void setLinkResponse(String linkResponse) {
        this.linkResponse = linkResponse;
    }

    public byte[] getPdfResponse() {
        return pdfResponse;
    }

    public Faq pdfResponse(byte[] pdfResponse) {
        this.pdfResponse = pdfResponse;
        return this;
    }

    public void setPdfResponse(byte[] pdfResponse) {
        this.pdfResponse = pdfResponse;
    }

    public String getPdfResponseContentType() {
        return pdfResponseContentType;
    }

    public Faq pdfResponseContentType(String pdfResponseContentType) {
        this.pdfResponseContentType = pdfResponseContentType;
        return this;
    }

    public void setPdfResponseContentType(String pdfResponseContentType) {
        this.pdfResponseContentType = pdfResponseContentType;
    }

    public Domain getDomain() {
        return domain;
    }

    public Faq domain(Domain domain) {
        this.domain = domain;
        return this;
    }

    public void setDomain(Domain domain) {
        this.domain = domain;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Faq faq = (Faq) o;
        if (faq.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), faq.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Faq{" +
            "id=" + getId() +
            ", faqName='" + getFaqName() + "'" +
            ", faqType='" + getFaqType() + "'" +
            ", language='" + getLanguage() + "'" +
            ", textResponse='" + getTextResponse() + "'" +
            ", linkResponse='" + getLinkResponse() + "'" +
            ", pdfResponse='" + getPdfResponse() + "'" +
            ", pdfResponseContentType='" + getPdfResponseContentType() + "'" +
            "}";
    }
}
