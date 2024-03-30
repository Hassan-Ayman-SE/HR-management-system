
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
let employees = [];
const depts = ['Administration', 'Finance', 'Development', 'Marketing'];
// Employee 
class Employee {
    //constructor
    constructor(fullName, department, level, imageUrl) {
        this.id = generateAUniqueId();
        this.fullName = fullName;
        this.department = department;
        this.level = level;
        this.imageUrl = imageUrl;
        this.salary = generateRandomSalary();
        employees.push(this);
    }



}

Employee.prototype.calculateSalary = function () {
    const sal = generateRandomSalary(this.level);
    const taxPercent = 7.5;
    const taxAmount = (sal * taxPercent) / 100;
    const netSalary = sal - taxAmount;

    return netSalary;
}

Employee.prototype.renderNameAndSalary = function () {
    return `${this.fullName} ${this.salary}`;
}



new Employee("Ghazi Samer", "Administration", "Senior", "https://cdn-icons-png.flaticon.com/128/4140/4140048.png");
new Employee("Lana Ali", "Finance", "Senior", "https://cdn-icons-png.flaticon.com/128/4140/4140047.png");
new Employee("Tamara Ayoub", "Marketing", "Senior", "https://cdn-icons-png.flaticon.com/128/4140/4140051.png");
new Employee("Safi Walid", "Administration", "Mid-Senior", "https://cdn-icons-png.flaticon.com/128/4139/4139981.png");
new Employee("Omar Zaid", "Development", "Senior", "https://cdn-icons-png.flaticon.com/128/3001/3001764.png");
new Employee("Rana Saleh", "Development", "Junior", "https://cdn-icons-png.flaticon.com/128/4140/4140047.png");
new Employee("Hadi Ahmad", "Finance", "Mid-Senior", "https://cdn-icons-png.flaticon.com/128/4202/4202831.png");

// let tbl = document.getElementsByTagName("tbody");
// for(let i = 0; i < employees.length; i++){
//     let emp = employees[i];
//     tbl[0].innerHTML += `
//     <tr>
//     <td>${emp.id}</td>
//     <td>${emp.fullName}</td>
//     <td>${emp.department}</td>
//     <td>${emp.level}</td>
//     <td><img src="${emp.imageUrl}" alt="img"></td>
//     <td>${emp.calculateSalary()}</td>
//     <td>${emp.salary}</td>
//     </tr>
//     `;
// }
// console.log(tbl[0].innerHTML);

let f = document.forms[0];
f.addEventListener("submit", function (onSubmit) {
    let fullName = onSubmit.target.fullName.value;
    let department = onSubmit.target.department.value;
    let level = onSubmit.target.level.value;
    let imageUrl = onSubmit.target.imageUrl.value;
    if (fullName === "" || department === "") {
        onSubmit.preventDefault();
    } else {
        new Employee(fullName, department, level, imageUrl);
    }
});
let main = document.querySelector('main');

depts.forEach(department => {
    // Filtering by depts
    let departmentEmps = employees.filter(employee => employee.department === department);

    // deptSection
    let deptSection = document.createElement("section");
    deptSection.classList.add("employees");

    //department heading
    let deptHeading = document.createElement("h2");
    deptHeading.textContent = department;
    deptSection.appendChild(deptHeading);

    // Append employee cards to the section
    departmentEmps.forEach(emp => {
        let firstName = emp.fullName.split(" ")[0];//becuase images in asset is the first name of employee
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("my-card");
        cardDiv.innerHTML = `
            <img src="assets/${firstName}.jpg">
            <div class="card-content">
                <p>Name: ${emp.fullName} - ID: ${emp.id}</p>
                <p>Department: ${emp.department} - Level: ${emp.level}</p>
                <p>1640</p>
            </div>
            `
            ;
        deptSection.appendChild(cardDiv);
    });

    // Append to Main
    main.appendChild(deptSection);
});

