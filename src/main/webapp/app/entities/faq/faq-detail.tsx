import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './faq.reducer';
import { IFaq } from 'app/shared/model/faq.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFaqDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FaqDetail extends React.Component<IFaqDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { faqEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="rhApp.faq.detail.title">Faq</Translate> [<b>{faqEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="faqName">
                <Translate contentKey="rhApp.faq.faqName">Faq Name</Translate>
              </span>
            </dt>
            <dd>{faqEntity.faqName}</dd>
            <dt>
              <span id="faqType">
                <Translate contentKey="rhApp.faq.faqType">Faq Type</Translate>
              </span>
            </dt>
            <dd>{faqEntity.faqType}</dd>
            <dt>
              <span id="language">
                <Translate contentKey="rhApp.faq.language">Language</Translate>
              </span>
            </dt>
            <dd>{faqEntity.language}</dd>
            <dt>
              <span id="textResponse">
                <Translate contentKey="rhApp.faq.textResponse">Text Response</Translate>
              </span>
            </dt>
            <dd>{faqEntity.textResponse}</dd>
            <dt>
              <span id="linkResponse">
                <Translate contentKey="rhApp.faq.linkResponse">Link Response</Translate>
              </span>
            </dt>
            <dd>{faqEntity.linkResponse}</dd>
            <dt>
              <span id="pdfResponse">
                <Translate contentKey="rhApp.faq.pdfResponse">Pdf Response</Translate>
              </span>
            </dt>
            <dd>
              {faqEntity.pdfResponse ? (
                <div>
                  <a onClick={openFile(faqEntity.pdfResponseContentType, faqEntity.pdfResponse)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                  <span>
                    {faqEntity.pdfResponseContentType}, {byteSize(faqEntity.pdfResponse)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <Translate contentKey="rhApp.faq.domain">Domain</Translate>
            </dt>
            <dd>{faqEntity.domain ? faqEntity.domain.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/faq" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/faq/${faqEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ faq }: IRootState) => ({
  faqEntity: faq.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FaqDetail);
