const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { postEmployee } = require("./mocks/employees");

describe("Employees Tests", () => {
  let saveEmployee;
  it("should insert the employee", (done) => {
    chai
      .request("http://localhost:8001")
      .post("/employees")
      .send(postEmployee)
      .end(function (err, res) {
        saveEmployee = res.body.employees.filter(
          (employee) => employee.demographic.lastName === "Evans-Sdf"
        );
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should update the employee", (done) => {
    saveEmployee[0].demographic.firstName = "William";
    chai
      .request("http://localhost:8001")
      .put("/employees")
      .send({ data: saveEmployee[0] })
      .end(function (err, res) {
        let updateEmployee = res.body.employees.filter(
          (employee) => employee.demographic.lastName === "Evans-Sdf"
        )[0];
        expect(updateEmployee.demographic.firstName).to.equal("William");
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should get the employee", (done) => {
    chai
      .request("http://localhost:8001")
      .get("/employees")
      .end(function (err, res) {
        let getEmployee = res.body.employees.filter(
          (employee) => employee.demographic.lastName === "Evans-Sdf"
        )[0];
        expect(getEmployee.demographic.firstName).to.equal("William");
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should delete the employee", (done) => {
    chai
      .request("http://localhost:8001")
      .delete("/employees")
      .send({ _id: saveEmployee[0]._id })
      .end(function (err, res) {
        let deleteEmployee = res.body.employees.filter(
          (employee) => employee.demographic.lastName === "Evans-Sdf"
        );
        expect(deleteEmployee.length).to.equal(0);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});
