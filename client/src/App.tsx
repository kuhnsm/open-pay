import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopNav from "./Layouts/TopNav";
import Employee from "./Pages/Employees/Employee";
import Employees from "./Pages/Employees/Employees";
import config from "./config";

config.init();

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Users() {
  return <h2>Users</h2>;
}

function App() {
  return (
    <Router>
      <TopNav>
        <Switch>
          <Route path="/employee">
            <Employee />
          </Route>
          <Route path="/employees">
            <Employees />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </TopNav>
    </Router>
  );
}

export default App;
