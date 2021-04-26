import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from "uuid";

function App() {
  const [Activities, setActivities] = useState<Activity[]>([]);
  const [SelectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [EditMode, setEditMode] = useState<Boolean>(false);  //TypeScript can infer the type itself, I write it down to practice specifing types

  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activities").then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, [])

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(Activities.find(x => x.id === id))
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleCreateOrEditActivity = (activity: Activity) => {
    activity.id ? setActivities([...Activities.filter(x => x.id !== activity.id), activity]) : setActivities([...Activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity)
  };

  const handleDeleteActivity = (id: string) => {
    setActivities([...Activities.filter(x => x.id !== id)])
  };


  return (
    <>

      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "8em" }}>

        <ActivityDashboard
          activities={Activities}
          selectedActivity={SelectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={EditMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />

      </Container>
    </>
  );
}

export default App;
