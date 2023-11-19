import React from "react";
import { BASE_URL } from "../../services/helper";
import "./card.css";
import Badge from "react-bootstrap/Badge";

import { NavLink } from "react-router-dom";
// import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Cardi = ({
  fname,
  domain,
  lname,
  gender,
  status,
  img,
  id,
  deleteUser,
}) => {
  return (
    // <div className="card_container">
    //   <div className="card_header">
    //     <img src={`${BASE_URL}/uploads/${img}`} alt="img" />
    //   </div>
    //   <div className="card_body">
    //     <p className="card_body_name">
    //       {fname} {lname}
    //     </p>
    //     <p>{domain}</p>
    //     <p>{gender}</p>
    //     <p>{status}</p>
    //   </div>
    //   <div className="card_footer">
    //     <Button variant="primary">
    //       <NavLink className="text-decoration-none" to={`/userprofile/`}>
    //         <i class="fa-solid fa-pen-to-square" style={{ color: "white" }}></i>{" "}
    //         <span style={{ color: "white" }}>Edit</span>
    //       </NavLink>
    //     </Button>
    //     <Button variant="success">
    //       <NavLink className="text-decoration-none" to={`/userprofile/`}>
    //         <i class="fa-solid fa-eye" style={{ color: "white" }}></i>{" "}
    //         <span style={{ color: "white" }}>View</span>
    //       </NavLink>
    //     </Button>
    //     <Button variant="danger">
    //       <NavLink className="text-decoration-none" to={`/userprofile/`}>
    //         <i class="fa-solid fa-trash" style={{ color: "white" }}></i>{" "}
    //         <span style={{ color: "white" }}>Delete</span>
    //       </NavLink>
    //     </Button>
    //   </div>
    // </div>
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={`${BASE_URL}/uploads/${img}`}
        className="card_img"
      />
      <Card.Body>
        <Card.Title>
          {fname} {lname}
        </Card.Title>
        <Card.Text>
          Domain - {domain}
          <br></br>
          <Badge bg={status == "Active" ? "primary" : "danger"}>{status}</Badge>
        </Card.Text>
        <div className="card_footer">
          <Button variant="primary">
            <NavLink className="text-decoration-none" to={`/edit/${id}`}>
              <i
                class="fa-solid fa-pen-to-square"
                style={{ color: "white" }}
              ></i>{" "}
              <span style={{ color: "white" }}>Edit</span>
            </NavLink>
          </Button>
          <Button variant="success">
            <NavLink className="text-decoration-none" to={`/userprofile/${id}`}>
              <i class="fa-solid fa-eye" style={{ color: "white" }}></i>{" "}
              <span style={{ color: "white" }}>View</span>
            </NavLink>
          </Button>
          <Button variant="danger" onClick={() => deleteUser(id)}>
            <i class="fa-solid fa-trash" style={{ color: "white" }}></i>{" "}
            <span style={{ color: "white" }}>Delete</span>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Cardi;
