import { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../../Axios/Employees";
import { Search, Pencil, Trash } from "react-bootstrap-icons";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Navbar,
  Nav,
  Form,
  Table,
} from "react-bootstrap";
import debounce from "lodash.debounce";
import ReactPaginate from "react-paginate";

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
  const [totalRecords, setTotalRecords] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    getEmployees("", 0, itemsPerPage).then((response: any) => {
      setData(response?.data?.employees);
      setTotalRecords(response.headers["x-total-count"]);
    });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteEmployee = () => {
    setShow(false);
    if (employee._id) {
      deleteEmployee(employee._id).then((response) => {
        setData(response?.data?.employees);
      });
    }
  };

  const editEmployee = (employee: any) => {
    history.push({ pathname: "/employee/", state: { data: employee } });
  };

  const deleteEmployeeDialog = (employee: any) => {
    setEmployee(employee);
    handleShow();
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((nextValue) => {
        getEmployees(nextValue, 0, 10).then((response: any) => {
          setData(response?.data?.employees);
          setTotalRecords(response.headers["x-total-count"]);
        });
      }, 1000),
    [] // will be created only once initially
  );

  const searchEmployees = (event: any) => {
    const { value: nextValue } = event.target;
    debouncedSearch(nextValue);
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
          <Button
            data-cy="confirm-delete"
            variant="primary"
            onClick={handleDeleteEmployee}
          >
            Delete Employee
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const handlePageClick = (data: { selected: number }) => {
    console.log("data", data);
    console.log("data.selected", data.selected);
    getEmployees("", data.selected * 10, 10).then((response: any) => {
      setData(response?.data?.employees);
      setTotalRecords(response.headers["x-total-count"]);
    });
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <InputGroup>
              <FormControl
                data-cy="search-employee"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
                onChange={searchEmployees}
              />
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon2">
                  <Search />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Nav>
          <Form inline>
            <Button
              data-cy="add-employee"
              variant="success"
              onClick={() => {
                history.push("/employee/");
              }}
            >
              New Employee
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      {
        <Table hover>
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
            {data?.map((employee: Employee) => {
              return (
                <tr key={employee?._id}>
                  <td>{employee?._id}</td>
                  <td>{employee?.demographic?.firstName}</td>
                  <td>{employee?.demographic?.lastName}</td>
                  <td>{employee?.job?.jobTitle}</td>
                  <td>{employee?.job?.employeeType}</td>
                  <td>{employee?.job?.payFrequency}</td>
                  <td>
                    {
                      <Pencil
                        data-cy="edit-button"
                        onClick={() => editEmployee(employee)}
                      />
                    }
                    {
                      <Trash
                        data-cy="delete-button"
                        style={{ marginLeft: "10px" }}
                        onClick={() => deleteEmployeeDialog(employee)}
                      />
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      }
      {data.length === 0 && (
        <p>There are no employees found, please add employee.</p>
      )}
      <DeleteDialog />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={totalRecords / itemsPerPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-link"}
        />
      </div>
    </>
  );
}
