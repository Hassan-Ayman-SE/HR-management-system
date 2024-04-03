let main = document.querySelector('main');
let employees = [];

function generateAUniqueId() {
  return 1000 + employees.length;
}

function generateRandomSalary(level) {
  let minSalary, maxSalary;

  switch (level) {
    case "Senior":
      minSalary = 1500;
      maxSalary = 2000;
      break;
    case "Mid-Senior":
      minSalary = 1000;
      maxSalary = 1500;
      break;
    case "Junior":
      minSalary = 500;
      maxSalary = 1000;
      break;
  }

  return Math.floor(Math.random() * (maxSalary - minSalary + 1) + minSalary);
}

class Employee {
  constructor(fullName, department, level, imageUrl) {
    this.id = generateAUniqueId();
    this.fullName = fullName;
    this.department = department;
    this.level = level;
    this.imageUrl = imageUrl;
    this.salary = generateRandomSalary(level);
    employees.push(this);
  }
}

Employee.prototype.calculateSalary = function () {
  const taxPercent = 7.5;
  const taxAmount = (this.salary * taxPercent) / 100;
  const netSalary = this.salary - taxAmount;

  return netSalary;
};

Employee.prototype.render = function () {
  let cardDiv = document.createElement("div");
  cardDiv.classList.add("my-card");
  cardDiv.innerHTML = `
    <img src="${this.imageUrl}">
    <div class="card-content">
      <p>Name: ${this.fullName} - ID: ${this.id}</p>
      <p>Department: ${this.department} - Level: ${this.level}</p>
      <p>${this.calculateSalary()}</p>
    </div>
  `;

  let departmentSection = document.getElementById(this.department);
  console.log(departmentSection);
  if (departmentSection) {
    departmentSection.appendChild(cardDiv);
  } else {
    let deptSection = document.createElement("section");
    deptSection.id = this.department;
    deptSection.classList.add("employees");
    let deptHeading = document.createElement("h2");
    deptHeading.textContent = this.department;
    deptSection.appendChild(deptHeading);
    deptSection.appendChild(cardDiv);
    main.appendChild(deptSection);
  }
};

// Save data to local storage
function saveData(employee) {

  if (localStorage.getItem("employees") == null) {
    localStorage.setItem("employees", JSON.stringify([]));
  }

  let employees = JSON.parse(localStorage.getItem("employees"));

  if (!employees.map(emp => emp.id).includes(employee.id)) {
    employees.push(employee);
    localStorage.setItem("employees", JSON.stringify(employees));
  }
}

function renderEmployees() {
  employees.forEach((emp) => {
    emp.render();
    saveData(emp);
  });
  
}

// function getData(){
//   let retrievedData = localStorage.getItem("employees");
//   let arrayData = JSON.parse(retrievedData);
//   if(arrayData != null){
//       for(let i = 0; i < arrayData.length;i++){
//           new Employee(arrayData[i].fullName,arrayData[i].department,arrayData[i].level,arrayData[i].imageUrl);
//           employees[i].render();
//       }
//   }

// }

const empForm = document.getElementById("empForm");
empForm.addEventListener('submit', addNewEmpHandler);

function addNewEmpHandler(event) {
  event.preventDefault();

  const fullName = event.target.fullname.value;
  const department = event.target.department.value;
  const level = event.target.level.value;
  const imageUrl = event.target.imageurl.value;

  const newEmp = new Employee(fullName, department, level, imageUrl);
  newEmp.render();
  saveData(newEmp);
}

// Employees Object
new Employee("Ghazi Samer", "Administration", "Senior", "https://cdn-icons-png.flaticon.com/128/4140/4140048.png");
new Employee("Lana Ali", "Finance", "Senior", "https://cdn-icons-png.flaticon.com/128/4140/4140047.png");
new Employee("Tamara Ayoub", "Marketing", "Senior", "https://cdn-icons-png.flaticon.com/128/4140/4140051.png");
new Employee("Safi Walid", "Administration", "Mid-Senior", "https://cdn-icons-png.flaticon.com/128/4139/4139981.png");
new Employee("Omar Zaid", "Development", "Senior", "https://cdn-icons-png.flaticon.com/128/3001/3001764.png");
new Employee("Rana Saleh", "Development", "Junior", "https://cdn-icons-png.flaticon.com/128/4140/4140047.png");
new Employee("Hadi Ahmad", "Finance", "Mid-Senior", "https://cdn-icons-png.flaticon.com/128/4202/4202831.png");
renderEmployees();