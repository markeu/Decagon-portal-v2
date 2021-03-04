import React, {Suspense, lazy} from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const PersonalInfo = lazy(() => import('../components/PersonalInfo'));
const AddressInfo = lazy(() => import('../components/AddressInfo'));
const Education = lazy(() => import('../components/Education'));
const Other = lazy(() => import('../components/Other'));
function ProgramsAdmin() {
  const { path } = useRouteMatch();
  return (
    <DashboardLayout>
      <Suspense fallback={'Loading........'}>
        <Switch>
          <Route exact path={`${path}/personalInfo`} component={PersonalInfo} />
          <Route exact path={`${path}/addressInfo`} component={AddressInfo} />
          <Route exact path={`${path}/education`} component={Education} />
          <Route exact path={`${path}/other`} component={Other} />
          <Redirect from="*" to={`${path}/personalInfo`} />
        </Switch>
      </Suspense>
    </DashboardLayout>
  );
}

export default ProgramsAdmin

