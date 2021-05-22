import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export default function TopNav(props: any) {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>
          <Link className="navbar-brand" to="/">
            OpenPay
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                data-cy="employees-link"
                className="nav-link"
                to="/employees/"
              >
                Employees
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {props.children}
    </div>
  );
}
