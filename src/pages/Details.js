import React, {Suspense, lazy} from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailsLayout from '../components/DetailsLayout';

const Details = lazy(() => import('../components/Details'))
const CurriculumPage = lazy(() => import('../components/Curriculum'))
function DetailsPage() {
  const { path } = useRouteMatch();
  return (
    <DetailsLayout>
      <Suspense fallback={'Loading........'}>
        <Switch>
          <Route exact path={`${path}/info`} component={Details} />
          <Route exact path={`${path}/curriculumPage`} component={CurriculumPage} />
          <Redirect from="*" to={`${path}/Info`} />
        </Switch>
      </Suspense>
    </DetailsLayout>
  );
}

export default DetailsPage

