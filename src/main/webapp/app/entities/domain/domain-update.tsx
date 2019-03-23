import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getDomains } from 'app/entities/domain/domain.reducer';
import { getEntity, updateEntity, createEntity, reset } from './domain.reducer';
import { IDomain } from 'app/shared/model/domain.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDomainUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDomainUpdateState {
  isNew: boolean;
  parentDomainId: string;
}

export class DomainUpdate extends React.Component<IDomainUpdateProps, IDomainUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      parentDomainId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getDomains();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { domainEntity } = this.props;
      const entity = {
        ...domainEntity,
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
    this.props.history.push('/entity/domain');
  };

  render() {
    const { domainEntity, domains, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="rhApp.domain.home.createOrEditLabel">
              <Translate contentKey="rhApp.domain.home.createOrEditLabel">Create or edit a Domain</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : domainEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="domain-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="domainNameLabel" for="domainName">
                    <Translate contentKey="rhApp.domain.domainName">Domain Name</Translate>
                  </Label>
                  <AvField
                    id="domain-domainName"
                    type="text"
                    name="domainName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="languageLabel">
                    <Translate contentKey="rhApp.domain.language">Language</Translate>
                  </Label>
                  <AvInput
                    id="domain-language"
                    type="select"
                    className="form-control"
                    name="language"
                    value={(!isNew && domainEntity.language) || 'FRENCH'}
                  >
                    <option value="FRENCH">
                      <Translate contentKey="rhApp.Language.FRENCH" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="parentDomain.id">
                    <Translate contentKey="rhApp.domain.parentDomain">Parent Domain</Translate>
                  </Label>
                  <AvInput id="domain-parentDomain" type="select" className="form-control" name="parentDomain.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/domain" replace color="info">
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
  domainEntity: storeState.domain.entity,
  loading: storeState.domain.loading,
  updating: storeState.domain.updating,
  updateSuccess: storeState.domain.updateSuccess
});

const mapDispatchToProps = {
  getDomains,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DomainUpdate);
