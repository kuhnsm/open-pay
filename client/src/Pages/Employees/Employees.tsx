import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { Modal, Button } from "react-bootstrap";
interface Employee {
  _id?: string;
  demographic?: {
    lastName: string;
    firstName: string;
  };
  job?: {
    jobTitle: string;
    employeeType: string;
    payFrequency: string;
  };
}

export default function Employees() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [employee, setEmployee] = useState<Employee>({});

  useEffect(() => {
    axios.get("/employees").then((response) => {
      console.log(response?.data?.employees);
      setData(response?.data?.employees);
    });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteEmployee = () => {
    console.log("deleteEmployee", employee);
    setShow(false);
    axios
      .delete("/employees", { data: { _id: employee._id } })
      .then((response) => {
        console.log(response?.data?.employees);
        setData(response?.data?.employees);
      });
  };

  const editEmployee = (employee: any) => {
    console.log("editEmployee", employee);
    history.push({ pathname: "/employee/", state: { data: employee } });
  };

  const deleteEmployee = (employee: any) => {
    console.log("deleteEmployee", employee);
    setEmployee(employee);
    handleShow();
  };

  function DeleteDialog() {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please confirm deletion of employee</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDeleteEmployee}>
            Delete Employee
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
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
            <th scope="col">Actions</th>
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
                <td>
                  {
                    <PencilIcon
                      style={{ height: "25px" }}
                      onClick={() => editEmployee(employee)}
                    />
                  }
                  {
                    <TrashIcon
                      style={{ marginLeft: "5px", height: "25px" }}
                      onClick={() => deleteEmployee(employee)}
                    />
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <DeleteDialog />
    </>
  );
}
