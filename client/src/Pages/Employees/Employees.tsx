import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
interface Employee {
  _id: string;
  demographic: {
    lastName: string;
    firstName: string;
  };
  job: {
    jobTitle: string;
    employeeType: string;
    payFrequency: string;
  };
}
export default function Employees() {
  const history = useHistory();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/employees").then((response) => {
      console.log(response?.data?.employees);
      setData(response?.data?.employees);
    });
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <input type="text"></input>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              onClick={() => {
                history.push("/employee/");
              }}
            >
              New Employee
            </button>
          </li>
        </ul>
      </nav>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Title</th>
            <th scope="col">Employee Type</th>
            <th scope="col">Pay Frequency</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee: Employee) => {
            return (
              <tr>
                <td>{employee?._id}</td>
                <td>{employee?.demographic?.firstName}</td>
                <td>{employee?.demographic?.lastName}</td>
                <td>{employee?.job?.jobTitle}</td>
                <td>{employee?.job?.employeeType}</td>
                <td>{employee?.job?.payFrequency}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
