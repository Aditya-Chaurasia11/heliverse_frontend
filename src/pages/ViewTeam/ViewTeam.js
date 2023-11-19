import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../services/helper";
import moment from "moment";
import CardTeam from "../../components/Cards/CardTeam";
import Spiner from "../../components/Spiner/Spiner";
import "./viewteam.css";
import Card from "react-bootstrap/Card";

const ViewTeam = () => {
  const [teamData, setteamData] = useState({});
  const [showspin, setShowSpin] = useState(true);

  const { id } = useParams();

  const getteamData = async () => {
    const response = await axios.get(`${BASE_URL}/teams/${id}`);

    if (response.status === 200) {
      setteamData(response.data);
      console.log(response.data);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    getteamData();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [id]);

  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="viewteam_container">
          <div className="viewteam_container_header">
            <h1>Team member list ({teamData?.users.length})</h1>

            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Team name - {teamData.name}</Card.Title>

                <Card.Text>
                  Created at -{" "}
                  {moment(teamData.datecreated).format("DD-MM-YYYY")}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="viewteam_body">
            <div className="viewteam_body_div">
              {teamData?.users.map((k, id) => {
                return (
                  <>
                    <CardTeam
                      img={k.profile}
                      fname={k.fname}
                      lname={k.lname}
                      domain={k.domain}
                      id={k._id}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewTeam;
