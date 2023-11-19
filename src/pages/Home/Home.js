import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Tables from "../../components/Tables/Tables";
import Spiner from "../../components/Spiner/Spiner";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Typewriter } from "react-simple-typewriter";

import {
  addData,
  dltdata,
  updateData,
} from "../../components/context/ContextProvider";
import { usergetfunc, deletfunc, exporttocsvfunc } from "../../services/Apis";
import Alert from "react-bootstrap/Alert";
import "./home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [userdata, setUserData] = useState([]);
  const [domain, setDomain] = useState("All");
  const [showspin, setShowSpin] = useState(true);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { useradd, setUseradd } = useContext(addData);

  const { update, setUpdate } = useContext(updateData);
  const { deletedata, setDLtdata } = useContext(dltdata);

  const navigate = useNavigate();

  const adduser = () => {
    navigate("/register");
  };

  const handleDone = () => {
    console.log(`Done after 5 loops!`);
  };

  const handleType = (count) => {
    // access word count number
    // console.log(count);
  };

  // get user
  const userGet = async () => {
    const response = await usergetfunc(
      search,
      gender,
      status,
      domain,
      sort,
      page
    );
    if (response.status === 200) {
      setUserData(response.data.usersdata);
      setPageCount(response.data.Pagination.pageCount);
    } else {
      console.log("error for get user data");
    }
  };

  // user delete
  const deleteUser = async (id) => {
    const response = await deletfunc(id);
    if (response.status === 200) {
      userGet();
      setDLtdata(response.data);
    } else {
      toast.error("error");
    }
  };

  const Gender = [
    { value: "All", label: "All" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const domainOption = [
    { value: "All", label: "All" },
    { value: "Finance", label: "Finance" },
    { value: "IT", label: "IT" },
    { value: "Management", label: "Management" },
    { value: "UI Designing", label: "UI Designing" },
    { value: "Sales", label: "Sales" },
    { value: "Marketing", label: "Marketing" },
    { value: "Business Development", label: "Business Development" },
  ];

  const options = [
    { value: "All", label: "All" },
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  // export user
  const exportuser = async () => {
    const response = await exporttocsvfunc();
    if (response.status === 200) {
      window.open(response.data.downloadUrl, "blank");
    } else {
      toast.error("error !");
    }
  };

  // pagination
  // handle prev btn
  const handlePrevious = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };

  // handle next btn
  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };

  const setGenderFunction = (e) => {
    setGender(e.value);
  };

  const setDomainFunction = (e) => {
    setDomain(e.value);
  };

  const setStatusFunction = (e) => {
    setStatus(e.value);
  };

  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [search, gender, status, sort, page, domain]);

  return (
    <>
      {useradd ? (
        <Alert variant="success" onClose={() => setUseradd("")} dismissible>
          {useradd.fname.toUpperCase()} Succesfully Added
        </Alert>
      ) : (
        ""
      )}

      {update ? (
        <Alert variant="primary" onClose={() => setUpdate("")} dismissible>
          {update.fname.toUpperCase()} Succesfully Update
        </Alert>
      ) : (
        ""
      )}

      {deletedata ? (
        <Alert variant="danger" onClose={() => setDLtdata("")} dismissible>
          {deletedata.fname.toUpperCase()} Succesfully Delete
        </Alert>
      ) : (
        ""
      )}

      <div className="container">
        <div className="main_div">
          {/* search add btn */}
          <div className="search_add mt-4 d-flex justify-content-between align-content-center flex-wrap">
            <div className="home_header">
              <span>
                {/* Your fitness | */}
                <Typewriter
                  words={["Welcome to Heliverse", "Welcome to Heliverse"]}
                  loop={100}
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={80}
                  delaySpeed={1000}
                  onLoopDone={handleDone}
                  onType={handleType}
                />
              </span>
            </div>
            <div className="add_btn ">
              <Button variant="primary" onClick={adduser}>
                {" "}
                <i class="fa-solid fa-plus"></i>&nbsp; Add User
              </Button>
            </div>
          </div>
          {/* export,gender,status */}

          <div className="filter_div col-12 d-flex justify-content-between flex-wrap">
            {/* <div className="export_csv">
              <Button className="export_btn" onClick={exportuser}>
                Export To Csv
              </Button>
            </div> */}
            {/* <div className="filter_gender">
              <div className="filter"> */}
            {/* <div className=" col-lg-12 d-flex justify-content-between"> */}
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
            </div>
            <div className="col-lg-6 d-flex justify-content-between align-content-center select_group">
              <Select
                options={Gender}
                onChange={setGenderFunction}
                placeholder="Filter by gender"
                className="select_home"
              ></Select>
              <Select
                options={domainOption}
                onChange={setDomainFunction}
                placeholder="Filter by domain"
                className="select_home"

              ></Select>
              <Select
                options={options}
                onChange={setStatusFunction}
                placeholder="Filter by status"
                className="select_home"

              ></Select>
            </div>
            {/* <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="gender"
                    value={"All"}
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    onChange={(e) => setGender(e.target.value)}
                  /> */}
            {/* </div>
              </div> */}
            {/* </div> */}

            {/* short by value */}
            {/* <div className="filter_newold">
              <h3>Short By Value</h3>
              <Dropdown className="text-center">
                <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                  <i class="fa-solid fa-sort"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("new")}>
                    New
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>
                    Old
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div> */}
            {/* <div className="filter_gender">
              <div className="filter">
                <div className="gender d-flex justify-content-between"> */}
            {/* <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="domain"
                    value={"All"}
                    onChange={(e) => setDomain(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Finance`}
                    name="domain"
                    value={"Finance"}
                    onChange={(e) => setDomain(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`IT`}
                    name="domain"
                    value={"IT"}
                    onChange={(e) => setDomain(e.target.value)}
                  /> */}
            {/* </div>
              </div>
            </div> */}

            {/* filter by status */}
            {/* <div className="filter_status">
              <div className="status">
                <div className="status_radio d-flex justify-content-between flex-wrap"> */}
            {/* <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    onChange={(e) => setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"Active"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={"InActive"}
                    onChange={(e) => setStatus(e.target.value)}
                  /> */}
            {/* </div>
              </div>
            </div> */}
          </div>
        </div>
        {showspin ? (
          <Spiner />
        ) : (
          <Tables
            userdata={userdata}
            deleteUser={deleteUser}
            userGet={userGet}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            page={page}
            pageCount={pageCount}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
};

export default Home;
