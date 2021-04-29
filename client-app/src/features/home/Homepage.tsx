import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

const Homepage = () => (
  <Container style={{ marginTop: "8em" }}>
    <h1>Homepage</h1>
    <h3>Go to <Link to="/activities">Activities</Link> </h3>
  </Container>
)

export default Homepage