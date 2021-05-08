import { useEffect, useState } from "react";
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
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/employees").then((response) => {
      console.log(response?.data?.employees);
      setData(response?.data?.employees);
    });
  }, []);

  return (
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
  );
}
