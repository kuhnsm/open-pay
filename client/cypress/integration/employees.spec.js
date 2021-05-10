describe("Employee Tests", () => {
  it("should add an employee.", () => {
    cy.visit("http://localhost:3000/employees");
    cy.contains("There are no employees found, please add employee.");
    cy.get("[data-cy=add-employee]").click();

    //Enter demographic data
    cy.get("#root_firstName").type("Jim");
    cy.get("#root_middleName").type("R");
    cy.get("#root_lastName").type("Dillon");
    cy.get("#root_gender").select("Male");
    cy.get("#root_birthdate").type("1980-04-23");
    cy.get("[data-cy=demographic-next]").click();

    //Enter address information
    cy.get("#root_street1").type("123 Main St.");
    cy.get("#root_city").type("Millsville");
    cy.get("#root_state").type("CA");
    cy.get("#root_zip").type("99999");
    cy.get("[data-cy=address-next]").click();

    //Enter employment information
    cy.get("#root_employeeStatus").select("Active");
    cy.get("#root_hireDate").type("2021-05-10");
    cy.get("[data-cy=employment-next]").click();

    //Enter job information
    cy.get("#root_jobTitle").type("Manager");
    cy.get("#root_payFrequency").select("Semi-monthly");
    cy.get("#root_employeeType").select("Salaried");
    cy.get("#root_annualSalary").type("100000");
    cy.get("[data-cy=job-next]").click();

    cy.contains("Dillon, Jim");
    cy.contains("Status: Complete");
    cy.get("[data-cy=save-employee-button]").click();

    cy.get("[data-cy=employees-link]").click();
    cy.contains("Jim");
  });

  it("should edit an employee.", () => {
    cy.visit("http://localhost:3000/employees");
    cy.contains("td", "Dillon") // gives you the cell
      .siblings() // gives you all the other cells in the row
      .get("[data-cy=edit-button]") // finds the delete button
      .click();
    cy.get("#root_firstName").clear();
    cy.get("#root_firstName").type("James");
    cy.get("[data-cy=demographic-next]").click();
    cy.get("[data-cy=save-employee-button]").click();

    cy.get("[data-cy=employees-link]").click();
    cy.contains("James");
  });

  it("should delete an employee.", () => {
    cy.contains("td", "Dillon") // gives you the cell
      .siblings() // gives you all the other cells in the row
      .get("[data-cy=delete-button]") // finds the delete button
      .click();
    cy.get("[data-cy=confirm-delete]").click();
    cy.contains("There are no employees found, please add employee.");
  });
});
