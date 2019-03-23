import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './domain.reducer';
import { IDomain } from 'app/shared/model/domain.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDomainDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DomainDetail extends React.Component<IDomainDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { domainEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="rhApp.domain.detail.title">Domain</Translate> [<b>{domainEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="domainName">
                <Translate contentKey="rhApp.domain.domainName">Domain Name</Translate>
              </span>
            </dt>
            <dd>{domainEntity.domainName}</dd>
            <dt>
              <span id="language">
                <Translate contentKey="rhApp.domain.language">Language</Translate>
              </span>
            </dt>
            <dd>{domainEntity.language}</dd>
            <dt>
              <Translate contentKey="rhApp.domain.parentDomain">Parent Domain</Translate>
            </dt>
            <dd>{domainEntity.parentDomain ? domainEntity.parentDomain.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/domain" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/domain/${domainEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ domain }: IRootState) => ({
  domainEntity: domain.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DomainDetail);
