import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

const ActivityFilters = () => {
  return (
    <>
      <Menu size="large" vertical style={{ width: "100%", marginTop: "1.8em" }} >
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item content="All Activities" />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm hosting" />
      </Menu>
      <Header />
      <Calendar />
    </>
  );
}

export default ActivityFilters;
