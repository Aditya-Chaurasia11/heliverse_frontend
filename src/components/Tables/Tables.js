import React from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import Paginations from "../pagination/Paginations";
import { BASE_URL } from "../../services/helper";
import { NavLink } from "react-router-dom";
import { statuschangefunc } from "../../services/Apis";
import { ToastContainer, toast } from "react-toastify";
import CardComp from "../Cards/Card";
import "./table.css";

const Tables = ({
  userdata,
  deleteUser,
  userGet,
  handlePrevious,
  handleNext,
  page,
  pageCount,
  setPage,
}) => {
  const handleChange = async (id, status) => {
    const response = await statuschangefunc(id, status);

    if (response.status === 200) {
      userGet();
      toast.success("Status Updated");
    } else {
      toast.error("error ");
    }
  };

  return (
    <>
      <div className="table_container">
        {/* <Row> */}
        <div>
          {/* <Card className="shadow">
              <Table className="align-items-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Domain</th>
                    <th>Gender</th>
                    <th>&nbsp;&nbsp;&nbsp;Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead> */}
          {/* <tbody> */}
          <div className="card_container_outer">
            {userdata.length > 0 ? (
              userdata.map((element, index) => {
                return (
                  <div>
                    {/* <tr>
                            <td>{index + 1 + (page - 1) * 4}</td>
                            <td>{element.fname + element.lname}</td>
                            <td>{element.domain}</td>
                            <td>
                              {element.gender == "Male" ? "Male" : "Female"}
                            </td>
                            <td className="d-flex align-items-center badgeclass">
                              <Badge
                                bg={
                                  element.status == "Active"
                                    ? "primary"
                                    : "danger"
                                }
                                className=""
                              >
                                {element.status}
                              </Badge>
                              <Dropdown className="text-center">
                                <Dropdown.Toggle
                                  className="dropdown_btn"
                                  id="dropdown-basic"
                                >
                                  <Badge
                                    bg={
                                      element.status == "Active"
                                        ? "primary"
                                        : "danger"
                                    }
                                  >
                                    {element.status}{" "}
                                    <i class="fa-solid fa-angle-down"></i>
                                  </Badge>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleChange(element._id, "Active")
                                    }
                                  >
                                    Active
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleChange(element._id, "InActive")
                                    }
                                  >
                                    InActive
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            <td className="img_parent">
                              <img
                                src={`${BASE_URL}/uploads/${element.profile}`}
                                alt="img"
                              />
                            </td>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="light"
                                  className="action"
                                  id="dropdown-basic"
                                >
                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/userprofile/${element._id}`}
                                      className="text-decoration-none"
                                    >
                                      <i
                                        class="fa-solid fa-eye"
                                        style={{ color: "green" }}
                                      ></i>{" "}
                                      <span>View</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/edit/${element._id}`}
                                      className="text-decoration-none"
                                    >
                                      <i
                                        class="fa-solid fa-pen-to-square"
                                        style={{ color: "blue" }}
                                      ></i>{" "}
                                      <span>Edit</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <div
                                      onClick={() => deleteUser(element._id)}
                                    >
                                      <i
                                        class="fa-solid fa-trash"
                                        style={{ color: "red" }}
                                      ></i>{" "}
                                      <span>Delete</span>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr> */}
                    <CardComp
                      id={element._id}
                      fname={element.fname}
                      lname={element.lname}
                      domain={element.domain}
                      gender={element.gender}
                      status={element.status}
                      img={element.profile}
                      deleteUser={deleteUser}
                    ></CardComp>
                  </div>
                );
              })
            ) : (
              <div className="no_data text-center">NO Data Found</div>
            )}
          </div>
          {/* </tbody> */}
          {/* </Table> */}
          <div className="pagination_container">
            <Paginations
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              page={page}
              pageCount={pageCount}
              setPage={setPage}
            />
          </div>
          {/* </Card> */}
        </div>
        {/* </Row> */}
        <ToastContainer />
      </div>
    </>
  );
};

export default Tables;
