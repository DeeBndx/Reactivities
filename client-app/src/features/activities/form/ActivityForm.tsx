import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from "uuid";
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/models/activity';

const ActivityForm = () => {
  const history = useHistory();
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loading, loadingInitial, loadActivity } = activityStore;
  const { id } = useParams<{ id: string }>();

  const [Activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    description: "",
    category: "",
    date: null,
    city: "",
    venue: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    category: Yup.string().required(),
    date: Yup.string().required("Date is required").nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  })

  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!))
  }, [id, loadActivity])

  // const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = event.target;
  //   setActivity({ ...Activity, [name]: value })
  // };

  const handleFormSubmit = (Activity: Activity) => {
    console.log()
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
      <Header content="Activity Details" sub color="teal" />
      <Formik 
        validationSchema={validationSchema} 
        enableReinitialize 
        initialValues={Activity} 
        onSubmit={values => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >
            <MyTextInput name="title" placeholder="Title" />
            <MyTextArea name="description" placeholder="Description" rows={4} />
            <MySelectInput name="category" placeholder="Category" options={categoryOptions} />
            <MyDateInput 
              name="date"
              placeholderText="Date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />

            <Header content="Location Details" sub color="teal" />
            <MyTextInput name="city" placeholder="City" />
            <MyTextInput name="venue" placeholder="Venue" />

            <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated="right" positive type="submit" content="Submit" />
            <Button floated="right" type="button" content="Cancel" as={Link} to="/activities" />
          </Form>
        )}
      </Formik>

    </Segment>
  )
}

export default observer(ActivityForm)