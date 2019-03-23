import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDomain } from 'app/shared/model/domain.model';
import { getEntities as getDomains } from 'app/entities/domain/domain.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './faq.reducer';
import { IFaq } from 'app/shared/model/faq.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFaqUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFaqUpdateState {
  isNew: boolean;
  domainId: string;
}

export class FaqUpdate extends React.Component<IFaqUpdateProps, IFaqUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      domainId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getDomains();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { faqEntity } = this.props;
      const entity = {
        ...faqEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/faq');
  };

  render() {
    const { faqEntity, domains, loading, updating } = this.props;
    const { isNew } = this.state;

    const { textResponse, pdfResponse, pdfResponseContentType } = faqEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="rhApp.faq.home.createOrEditLabel">
              <Translate contentKey="rhApp.faq.home.createOrEditLabel">Create or edit a Faq</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : faqEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="faq-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="faqNameLabel" for="faqName">
                    <Translate contentKey="rhApp.faq.faqName">Faq Name</Translate>
                  </Label>
                  <AvField
                    id="faq-faqName"
                    type="text"
                    name="faqName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="faqTypeLabel">
                    <Translate contentKey="rhApp.faq.faqType">Faq Type</Translate>
                  </Label>
                  <AvInput
                    id="faq-faqType"
                    type="select"
                    className="form-control"
                    name="faqType"
                    value={(!isNew && faqEntity.faqType) || 'TEXT'}
                  >
                    <option value="TEXT">
                      <Translate contentKey="rhApp.FaqType.TEXT" />
                    </option>
                    <option value="LINK">
                      <Translate contentKey="rhApp.FaqType.LINK" />
                    </option>
                    <option value="PDF">
                      <Translate contentKey="rhApp.FaqType.PDF" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="languageLabel">
                    <Translate contentKey="rhApp.faq.language">Language</Translate>
                  </Label>
                  <AvInput
                    id="faq-language"
                    type="select"
                    className="form-control"
                    name="language"
                    value={(!isNew && faqEntity.language) || 'FRENCH'}
                  >
                    <option value="FRENCH">
                      <Translate contentKey="rhApp.Language.FRENCH" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="textResponseLabel" for="textResponse">
                    <Translate contentKey="rhApp.faq.textResponse">Text Response</Translate>
                  </Label>
                  <AvInput id="faq-textResponse" type="textarea" name="textResponse" />
                </AvGroup>
                <AvGroup>
                  <Label id="linkResponseLabel" for="linkResponse">
                    <Translate contentKey="rhApp.faq.linkResponse">Link Response</Translate>
                  </Label>
                  <AvField id="faq-linkResponse" type="text" name="linkResponse" />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="pdfResponseLabel" for="pdfResponse">
                      <Translate contentKey="rhApp.faq.pdfResponse">Pdf Response</Translate>
                    </Label>
                    <br />
                    {pdfResponse ? (
                      <div>
                        <a onClick={openFile(pdfResponseContentType, pdfResponse)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {pdfResponseContentType}, {byteSize(pdfResponse)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('pdfResponse')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_pdfResponse" type="file" onChange={this.onBlobChange(false, 'pdfResponse')} />
                    <AvInput type="hidden" name="pdfResponse" value={pdfResponse} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label for="domain.id">
                    <Translate contentKey="rhApp.faq.domain">Domain</Translate>
                  </Label>
                  <AvInput id="faq-domain" type="select" className="form-control" name="domain.id">
                    <option value="" key="0" />
                    {domains
                      ? domains.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/faq" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  domains: storeState.domain.entities,
  faqEntity: storeState.faq.entity,
  loading: storeState.faq.loading,
  updating: storeState.faq.updating,
  updateSuccess: storeState.faq.updateSuccess
});

const mapDispatchToProps = {
  getDomains,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FaqUpdate);
