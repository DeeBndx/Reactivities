import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from "uuid";
import { Link } from 'react-router-dom';

const ActivityForm = () => {
  const history = useHistory();
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loading, loadingInitial, loadActivity } = activityStore;
  const { id } = useParams<{ id: string }>();

  const [Activity, setActivity] = useState({
    id: "",
    title: "",
    description: "",
    category: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!))
  }, [id, loadActivity])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setActivity({ ...Activity, [name]: value })
  };

  const handleSubmit = () => {
    if (Activity.id.length === 0) {
      let newActivity = {
        ...Activity,
        id: uuid()
      }
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
    }
    else {
      updateActivity(Activity).then(() => history.push(`/activities/${Activity.id}`))
    }
  };

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off" >
        <Form.Input placeholder="Title" name="title" value={Activity.title} onChange={handleInputChange} />
        <Form.TextArea placeholder="Description" name="description" value={Activity.description} onChange={handleInputChange} />
        <Form.Input placeholder="Category" name="category" value={Activity.category} onChange={handleInputChange} />
        <Form.Input type="date" placeholder="Date" name="date" value={Activity.date} onChange={handleInputChange} />
        <Form.Input placeholder="City" name="city" value={Activity.city} onChange={handleInputChange} />
        <Form.Input placeholder="Venue" name="venue" value={Activity.venue} onChange={handleInputChange} />

        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
        <Button floated="right" type="button" content="Cancel" as={Link} to="/activities" />
      </Form>
    </Segment>
  )
}

export default observer(ActivityForm)