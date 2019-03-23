import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Domain from './domain';
import DomainDetail from './domain-detail';
import DomainUpdate from './domain-update';
import DomainDeleteDialog from './domain-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DomainUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DomainUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DomainDetail} />
      <ErrorBoundaryRoute path={match.url} component={Domain} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DomainDeleteDialog} />
  </>
);

export default Routes;
