import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./cardteam.css";

import { BASE_URL } from "../../services/helper";
import { NavLink } from "react-router-dom";

const CardTeam = ({ fname, lname, img, domain, id }) => {
  return (
    <Card style={{ width: "18rem" }} className="card_container_team">
      <Card.Img
        variant="top"
        src={`${BASE_URL}/uploads/${img}`}
        className="card_img_team"
      />
      <Card.Body>
        <Card.Title>
          {fname} {lname}
        </Card.Title>
        <Card.Text>
          Domain - {domain}
          <br></br>
        </Card.Text>
        <Button variant="primary">
          <NavLink className="text-decoration-none" to={`/userprofile/${id}`}>
            <span style={{ color: "white" }}>View Profile</span>
          </NavLink>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardTeam;
