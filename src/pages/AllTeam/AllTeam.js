import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../services/helper";
import Table from "react-bootstrap/Table";
import axios from "axios";
import moment from "moment";
import Button from "react-bootstrap/Button";
import "./allteam.css";
import { NavLink, useNavigate } from "react-router-dom";

const AllTeam = () => {
  const [teams, setTeams] = useState([]);

  const navigate = useNavigate();

  const addteam = () => {
    navigate("/team/create");
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/teams/all`);
        setTeams(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="team_container">
      <div className="team_header">
        <h2>All team list</h2>

        <Button variant="primary" onClick={addteam}>
          <i class="fa-solid fa-plus"></i>&nbsp; Add Team
        </Button>
      </div>
      <div className="team_table_container">
        <Table className="align-items-center w-100" responsive="sm">
          <thead className="thead-dark">
            <tr className="table-dark">
              <th>ID</th>
              <th>Team Name</th>
              <th>Created At</th>
              <th>Members</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teams.length > 0 ? (
              teams.map((k, i) => {
                return (
                  <tr key={k._id}>
                    <td>{i + 1}</td>
                    <td>{k.name}</td>
                    <td>{moment(k.createdAt).format("DD-MM-YYYY")}</td>
                    <td>{k.users.length}</td>
                    <td>
                      {" "}
                      <NavLink
                        to={`/viewteam/${k._id}`}
                        className="text-decoration-none"
                      >
                        <Button variant="primary">View</Button>
                      </NavLink>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div className="no_data text-center">NO Data Found</div>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AllTeam;
