import { useState } from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Nav, Row, Col, Navbar, Button } from "react-bootstrap";
import Demographic from "./Demographic";
import Address from "./Address";
import Employment from "./Employment";
import Job from "./Job";
import Deductions from "./Deductions";
import FederalTaxes from "./FederalTaxes";

interface EmployeeType {
  data: {
    _id?: any;
    demographic: any;
    address: any;
    job: any;
    isComplete: boolean;
  };
}
export default function Employee() {
  const location = useLocation<EmployeeType>();
  let employeeData = {
    demographic: {},
    address: {},
    job: {},
    isComplete: false,
  };
  if (location?.state?.data) employeeData = location?.state?.data;
  const [employee, updateEmployee] = useState<EmployeeType>({
    data: employeeData,
  });

  function determineEmployeeComplete() {
    let thisEmployee = employee.data; //convenience
    if (
      thisEmployee.demographic.firstName &&
      thisEmployee.demographic.lastName &&
      thisEmployee.demographic.birthdate &&
      thisEmployee.address.street1 &&
      thisEmployee.address.city &&
      thisEmployee.address.state &&
      thisEmployee.address.zip &&
      thisEmployee.job.jobTitle &&
      thisEmployee.job.annualSalary &&
      thisEmployee.job.payFrequency
    ) {
      return true;
    }
    return false;
  }
  const saveData = (key: any, newData: any) => {
    //get current data
    const { data } = employee;
    //append data
    // @ts-ignore
    data[key] = newData;
    //determine if the empployee can be saved
    data.isComplete = determineEmployeeComplete();
    updateEmployee({
      ...employee,
      data,
    });
  };

  const saveEmployee = async () => {
    console.log("************************************", employee);
    try {
      if (employee.data._id) await axios.put("/employees", employee);
      else await axios.post("/employees", employee);
    } catch (err) {
      console.log(`Error occured during employee save ${err}`);
    }
  };
  //<div className="col-2">
  return (
    <Row>
      <Col lg={2} xl={2} md={2} sm={2} xs={2}>
        <Nav className="flex-column">
          <Nav.Link>
            <Link className="nav-link" to="/employee/">
              Demographic
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="nav-link" to="/employee/address">
              Address
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="nav-link" to="/employee/employment">
              Employment
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="nav-link" to="/employee/job">
              Job
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="nav-link" to="/employee/federal-taxes">
              Federal Taxes
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="nav-link" to="/employee/deductions">
              Deductions
            </Link>
          </Nav.Link>
        </Nav>
      </Col>
      <Col>
        <Navbar bg="light" expand="lg">
          <Nav className="mr-auto">
            <Navbar.Text>
              {`Employee: ${
                employee?.data?.demographic?.lastName || "LastName"
              }, ${employee?.data?.demographic?.firstName || "FirstName"}`}
            </Navbar.Text>
            <Navbar.Text>
              {`Status: ${
                employee?.data?.isComplete ? "Complete" : "Incomplete"
              }`}
            </Navbar.Text>
          </Nav>
          <Nav className="ml-auto">
            <Button
              data-cy="save-employee-button"
              variant="outline-success"
              disabled={!employee?.data?.isComplete}
              onClick={() => {
                saveEmployee();
              }}
            >
              Save Employee
            </Button>
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path="/employee/">
            <Demographic update={saveData} employee={employee} />
          </Route>
          <Route path="/employee/address">
            <Address update={saveData} employee={employee} />
          </Route>
          <Route path="/employee/employment">
            <Employment update={saveData} employee={employee} />
          </Route>
          <Route path="/employee/job">
            <Job update={saveData} employee={employee} />
          </Route>
          <Route path="/employee/deductions">
            <Deductions update={saveData} employee={employee} />
          </Route>
          <Route path="/employee/federal-taxes">
            <FederalTaxes update={saveData} employee={employee} />
          </Route>
        </Switch>
      </Col>
    </Row>
  );
}
