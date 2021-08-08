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
        console.log(res.body);
        console.log(res.headers);
        expect(res.body.message).to.equal("Succesfully Employees Insert");
        expect(res.body.employees.length).to.equal(10);
        expect(res.headers["x-total-count"]).to.equal("101");
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should search for a specific employee", (done) => {
    chai
      .request("http://localhost:8001")
      .get("/employees?q=Evans-Sdf&skip=0&limit=10")
      .end(function (err, res) {
        let getEmployee = res.body.employees.filter(
          (employee) => employee.demographic.lastName === "Evans-Sdf"
        )[0];
        saveEmployee = getEmployee;
        expect(getEmployee.demographic.firstName).to.equal("Bill");
        expect(res.body.employees.length).to.equal(1);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should update the employee", (done) => {
    saveEmployee.demographic.firstName = "William";
    chai
      .request("http://localhost:8001")
      .put("/employees")
      .send({ data: saveEmployee })
      .end(function (err, res) {
        expect(res.body.employees.length).to.equal(10);
        expect(res.headers["x-total-count"]).to.equal("101");
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should search for a specific employee and see the changes from the update", (done) => {
    chai
      .request("http://localhost:8001")
      .get("/employees?q=Evans-Sdf&skip=0&limit=10")
      .end(function (err, res) {
        let getEmployee = res.body.employees.filter(
          (employee) => employee.demographic.lastName === "Evans-Sdf"
        )[0];
        saveEmployeeID = getEmployee._id;
        expect(getEmployee.demographic.firstName).to.equal("William");
        expect(res.body.employees.length).to.equal(1);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should employees with no search and return the page with correct total records", (done) => {
    chai
      .request("http://localhost:8001")
      .get("/employees?q=&skip=0&limit=10")
      .end(function (err, res) {
        expect(res.body.employees.length).to.equal(10);
        expect(parseInt(res.headers["x-total-count"])).to.equal(101);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should delete the employee", (done) => {
    chai
      .request("http://localhost:8001")
      .delete("/employees")
      .send({ _id: saveEmployeeID })
      .end(function (err, res) {
        expect(res.body.employees.length).to.equal(10);
        expect(res.body.message).to.equal("Succesfully Employees Delete");
        expect(res.headers["x-total-count"]).to.equal("100");
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should employees with no search and return the page with correct totals", (done) => {
    chai
      .request("http://localhost:8001")
      .get("/employees?q=&skip=1&limit=10")
      .end(function (err, res) {
        expect(res.body.employees.length).to.equal(10);
        expect(parseInt(res.headers["x-total-count"])).to.equal(100);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});
