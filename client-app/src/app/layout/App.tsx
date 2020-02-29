import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './Loading';
import ActivityStore from '../stores/activityStore'
import { observer } from 'mobx-react-lite'
import { Route, RouteComponentProps, withRouter, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import NotFound from './NotFound';
import {ToastContainer} from 'react-toastify';


const App: React.FC<RouteComponentProps> = ({ location }) => {
  const activityStore = useContext(ActivityStore)

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading Activities...' />

  return (
    // <Fragment>
    //   <NavBar />
    //   <Container style={{ marginTop: '7em' }}>
    //     <Route exact path='/' component={HomePage}  />
    //     <Route  path='/activities/:id' component={ActivityDetails}  />
    //     <Route key= {location.key}  path={['/createActivity','/manage/:id']} component={ActivityForm}  />
    //     <Route exact path='/activities' component={ActivityDashboard}  />
    //   </Container>
    // </Fragment>

    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <ToastContainer position='bottom-right' />
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route
                key={location.key}
                path={['/createActivity', '/manage/:id']}
                component={ActivityForm}
              />
              <Route component={NotFound}/>
              </Switch>
              
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};
export default withRouter(observer(App));
