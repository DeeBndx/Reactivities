import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from "uuid";
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [Activities, setActivities] = useState<Activity[]>([]);
  const [SelectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [EditMode, setEditMode] = useState<Boolean>(false);  //TypeScript can infer the type itself, I write it down to practice specifing types
  const [Loading, setLoading] = useState(true)
  const [Submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: Activity[] = [];
      response.forEach(x => {
        x.date = x.date.split("T")[0];
        activities.push(x);
      })
      setActivities(activities);
      setLoading(false);
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
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...Activities.filter(x => x.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...Activities, activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  };

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...Activities.filter(x => x.id !== id)])
      setSubmitting(false);
    })
  };

  if (Loading) return <LoadingComponent content="Loading Content" />

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
          submitting={Submitting}
        />

      </Container>
    </>
  );
}

export default App;
