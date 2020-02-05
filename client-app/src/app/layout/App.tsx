import React, { useEffect, useState, Fragment } from 'react';
import {  Container } from 'semantic-ui-react'
import axios from 'axios';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';


const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
  }

  useEffect(() => {
    axios
      .get<IActivity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data)
      });
  }, [])

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop : '7em'}}>
          <ActivityDashboard selectedActivity={selectedActivity!} activities={activities} selectActivity={handleSelectActivity} />
      </Container>
      </Fragment>


  
  );




};














export default App;
