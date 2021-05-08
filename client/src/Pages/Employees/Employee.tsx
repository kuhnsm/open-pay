import { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";

import Demographic from "./Demographic";
import Address from "./Address";
import Employment from "./Employment";
import Job from "./Job";
import Deductions from "./Deductions";
import FederalTaxes from "./FederalTaxes";

interface EmployeeType {
  data: {
    demographic: any;
    address: any;
    job: any;
    isComplete: boolean;
  };
}
export default function Employee() {
  const [employee, updateEmployee] = useState<EmployeeType>({
    data: { demographic: {}, address: {}, job: {}, isComplete: false },
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
    try {
      let result = await axios.post("/employees", employee);
      console.log(result);
    } catch (err) {
      console.log(`Error occured during employee save ${err}`);
    }
  };

  return (
    <div className="row">
      <div className="col-2">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" to="/employee/">
              Demographic
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/employee/address">
              Address
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/employee/employment">
              Employment
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/employee/job">
              Job
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/employee/federal-taxes">
              Federal Taxes
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/employee/deductions">
              Deductions
            </Link>
          </li>
        </ul>
      </div>
      <div className="col">
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <span className="nav-link">
                {`Employee: ${
                  employee?.data?.demographic?.lastName || "LastName"
                }, ${employee?.data?.demographic?.firstName || "FirstName"}`}
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link">
                {`Status: ${
                  employee?.data?.isComplete ? "Complete" : "Incomplete"
                }`}
              </span>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                disabled={!employee?.data?.isComplete}
                onClick={() => {
                  saveEmployee();
                }}
              >
                Save Employee
              </button>
            </li>
          </ul>
        </nav>
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
      </div>
    </div>
  );
}
