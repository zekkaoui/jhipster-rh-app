package tech.alphalupi.rhapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import tech.alphalupi.rhapp.domain.enumeration.Language;

/**
 * A Domain.
 */
@Entity
@Table(name = "domain")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Domain implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "domain_name", nullable = false)
    private String domainName;

    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    private Language language;

    @ManyToOne
    @JsonIgnoreProperties("domains")
    private Domain parentDomain;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDomainName() {
        return domainName;
    }

    public Domain domainName(String domainName) {
        this.domainName = domainName;
        return this;
    }

    public void setDomainName(String domainName) {
        this.domainName = domainName;
    }

    public Language getLanguage() {
        return language;
    }

    public Domain language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Domain getParentDomain() {
        return parentDomain;
    }

    public Domain parentDomain(Domain domain) {
        this.parentDomain = domain;
        return this;
    }

    public void setParentDomain(Domain domain) {
        this.parentDomain = domain;
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
        Domain domain = (Domain) o;
        if (domain.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), domain.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Domain{" +
            "id=" + getId() +
            ", domainName='" + getDomainName() + "'" +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
