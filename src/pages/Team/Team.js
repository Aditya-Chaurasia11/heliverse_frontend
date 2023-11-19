import { BASE_URL } from "../../services/helper";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

import "./team.css";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamName, setTeamName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/all`);
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelection = (userId) => {
    const selectedUser = users.find((user) => user._id === userId);
    const userIndex = selectedUsers.findIndex((user) => user._id === userId);

    if (
      selectedUser.status === "Active" &&
      !selectedUsers.some((user) => user.domain === selectedUser.domain)
    ) {
      if (userIndex === -1) {
        // User not found in selectedUsers, add it
        setSelectedUsers([...selectedUsers, selectedUser]);
      } else {
        // User found in selectedUsers, remove it (toggle off)
        const updatedUsers = [...selectedUsers];
        updatedUsers.splice(userIndex, 1);
        setSelectedUsers(updatedUsers);
      }
    } else {
      // User is inactive or already selected from the same domain
      // Toggle off the selection if it's clicked again
      const updatedUsers = selectedUsers.filter((user) => user._id !== userId);
      setSelectedUsers(updatedUsers);
      console.log("User is inactive or already selected from the same domain");
    }
  };

  const createUserTeam = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/team/register`, {
        teamName: teamName,
        selectedUsers: selectedUsers.map((user) => user._id),
      });
      // Handle successful team creation
      console.log("Team created:", response.data);
      const data = {
        teamName: teamName,
        selectedUsers: selectedUsers.map((user) => user._id),
      };
      console.log(data);
      setTeamName("");
      navigate("/team/home");

      // You can update the UI to show team details here
    } catch (error) {
      console.error("Error creating team:", error);
      // Handle error
    }
  };

  return (
    // <div>
    //   <h2>User List</h2>
    // {/* Display users and implement selection */}
    // {users.map((user) => (
    //   <div key={user._id}>
    //     <input
    //       type="checkbox"
    //       checked={selectedUsers.some(
    //         (selectedUser) => selectedUser._id === user._id
    //       )}
    //       onChange={() => handleUserSelection(user._id)}
    //     />
    //     <label>{user.fname}</label> -<label>{user.status}</label> -
    //     <label>{user.domain}</label>
    //   </div>
    // ))}
    // {/* Button to create team */}
    //   <input
    //     type="text"
    //     value={teamName}
    //     onChange={(e) => setTeamName(e.target.value)}
    //     placeholder="Enter Team Name"
    //   />
    //   {/* Button to create team */}
    //   <button onClick={createUserTeam}>Create Team</button>
    //   {/* Implement other functionalities */}
    // </div>
    <>
      <div className="team_container">
        <div className="team_container_header">
          <h1>Select users</h1>
          <div className="team_container_header_form">
            {/* <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter Team Name"
            /> */}

            <Form>
              <Form.Group className="" controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="text"
                  placeholder="Enter team name"
                  value={teamName}
                  className="form_control"
                  onChange={(e) => setTeamName(e.target.value)}
                  // style={{ width: "400px" }}
                  required
                />
              </Form.Group>
            </Form>

            <Button className="primary button_team" onClick={createUserTeam}>
              Create Team
            </Button>
          </div>
        </div>
        <div className="team_container_body">
          <Table className="align-items-center w-100" responsive="sm">
            <thead className="thead-dark">
              <tr className="table-dark">
                <th>Add</th>
                <th>User Name</th>
                <th>Gender</th>
                <th>Domain</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((k, i) => {
                  return (
                    <tr key={k._id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedUsers.some(
                            (selectedUser) => selectedUser._id === k._id
                          )}
                          onChange={() => handleUserSelection(k._id)}
                        />
                      </td>
                      <td>
                        {k.fname} {k.lname}
                      </td>
                      <td>{k.gender}</td>
                      <td>{k.domain}</td>
                      <td>{k.status}</td>
                      {/* <td>
                        {" "}
                        <NavLink
                          to={`/viewteam/${k._id}`}
                          className="text-decoration-none"
                        >
                          <Button variant="primary">View</Button>
                        </NavLink>
                      </td> */}
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
    </>
  );
};

export default UserList;
