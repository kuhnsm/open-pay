const postEmployee = {
  data: {
    demographic: {
      firstName: "Bill",
      middleName: "H",
      lastName: "Evans-Sdf",
      gender: "Male",
      birthdate: "1967-02-02",
    },
    address: {
      street1: "123 Main St",
      city: "Hinkleton",
      state: "MO",
      zip: "56553",
    },
    job: {
      employeeType: "Salaried",
      jobTitle: "Biller",
      payFrequency: "Semi-monthly",
      annualSalary: 50000,
    },
    isComplete: true,
    employment: {
      employeeStatus: "Active",
      hireDate: "2021-05-11",
    },
    federalTaxes: {
      filingStatus: "Married, filing jointly",
      qualifyingDependents: 2,
    },
  },
};

module.exports = {
  postEmployee,
};
