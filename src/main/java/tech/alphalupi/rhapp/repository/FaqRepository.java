package tech.alphalupi.rhapp.repository;

import tech.alphalupi.rhapp.domain.Faq;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Faq entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FaqRepository extends JpaRepository<Faq, Long> {

}
