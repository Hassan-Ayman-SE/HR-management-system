'use strict'
let depts = [];
class Department {
    constructor(name) {
        this.name = name;
        this.numberOfEmployees = 1;
        this.totalSalary = 0;
        this.averageSalary;
        depts.push(this);

    }

    sumTotalSalary(salary) {
        this.totalSalary += salary;
        this.averageSalary = this.totalSalary / this.numberOfEmployees;
    }
    addEmployee() {
        this.numberOfEmployees++;
    }
}

function goToHome(){
    window.location.href = 'index.html';
  } 
let emps = JSON.parse(localStorage.getItem("employees"));
emps.forEach(emp => {
    if (!depts.map(dept => dept.name).includes(emp.department)) {
        let newDept = new Department(emp.department);
        console.log(newDept);
        newDept.sumTotalSalary(emp.salary);
    } else {
        let dept = depts.find(dept => dept.name == emp.department);
        dept.addEmployee();
        dept.sumTotalSalary(emp.salary);
    }
});
let tableEl = document.createElement("table");
let tableHeadEl = document.createElement("thead");

tableHeadEl.innerHTML = `
<tr class ="row-style">
    <th>Department Name</th>
    <th>Number Of Employees</th>
    <th>Average Salary</th>
    <th>Total Salary</th>
</tr>
`;
tableEl.appendChild(tableHeadEl);
console.log(depts);
let tBody = document.createElement("tbody");

let allDepartmentsSalaries = 0;
let allDepartmentsAverageSalaries = 0;
depts.forEach(dept => {
    tBody.innerHTML += `
    <tr>
        <td>${dept.name}</td>
        <td>${dept.numberOfEmployees}</td>
        <td>${dept.averageSalary}</td>
        <td>${dept.totalSalary}</td>
    </tr>
    `;
     allDepartmentsSalaries += dept.totalSalary;
     allDepartmentsAverageSalaries += dept.averageSalary;
});

tableEl.appendChild(tBody);

let tFoot = document.createElement("tfoot");
tFoot.innerHTML = `
<tr class ="row-style">
        <td>Total:</td>
        <td>${emps.length}</td>
        <td>${allDepartmentsAverageSalaries.toFixed(3)}</td>
        <td>${allDepartmentsSalaries.toFixed(3)}</td>
    </tr>
`;
tableEl.appendChild(tFoot);
let main = document.getElementsByTagName("main")[0];
main.appendChild(tableEl);