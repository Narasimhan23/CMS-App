import React from "react";
import {Jumbotron,Button} from "react-bootstrap"

const Landing = () => {
    return <Jumbotron>
    <h1>CMS App</h1>
    <p>
        Best place to read tech blogs!!
        <br />
        Come for what you love.
        Stay for what you discover.
    </p>
    <p>
      <Button href="/register" variant="primary">Register</Button>{" "}
      <Button href="/login" variant="primary">Login</Button>
    </p>
  </Jumbotron>
}

export default Landing;