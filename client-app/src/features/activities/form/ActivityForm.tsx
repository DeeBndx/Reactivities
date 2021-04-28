import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

const ActivityForm = () => {

  const { activityStore } = useStore();
  const { selectedActivity, closeForm, createActivity, updateActivity, loading } = activityStore;

  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    description: "",
    category: "",
    date: "",
    city: "",
    venue: "",
  }

  const [Activity, setActivity] = useState(initialState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setActivity({ ...Activity, [name]: value })
  };

  const handleSubmit = () => {
    Activity.id ? updateActivity(Activity) : createActivity(Activity);
  };

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
        <Button floated="right" type="button" content="Cancel" onClick={closeForm} />
      </Form>
    </Segment>
  )
}

export default observer(ActivityForm)