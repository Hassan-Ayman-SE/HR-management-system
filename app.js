// Employee 
class Employee {
    //constructor
    constructor(id, fullName, department, level, imageUrl, salary) {
        this.id = id;
        this.fullName = fullName;
        this.department = department;
        this.level = level;
        this.imageUrl = imageUrl;
        this.salary = salary;
    }

     

}
Employee.prototype.calculateSalary = function () {
    let minSalary, maxSalary;

    switch (this.level) {
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

    this.salary = Math.floor(Math.random() * (maxSalary - minSalary + 1) + minSalary);
    const taxPercent = 7.5;
    const taxAmount = (this.salary  * taxPercent) / 100;
    const netSalary = this.salary  - taxAmount;

    return netSalary;
}

Employee.prototype.renderNameAndSalary = function (){
    return `${this.fullName} ${this.salary}`;
}

const employees = [
    new Employee(1000, "Ghazi Samer", "Administration", "Senior", "https://cdn-icons-png.flaticon.com/128/4140/4140048.png"),
    new Employee(1001, "Lana Ali", "Finance", "Senior", "https://cdn-icons-png.flaticon.com/128/4140/4140047.png"),
    new Employee(1002, "Tamara Ayoub", "Marketing", "Senior", "https://cdn-icons-png.flaticon.com/128/4140/4140051.png"),
    new Employee(1003, "Safi Walid", "Administration", "Mid-Senior", "https://cdn-icons-png.flaticon.com/128/4139/4139981.png"),
    new Employee(1004, "Omar Zaid", "Development", "Senior", "https://cdn-icons-png.flaticon.com/128/3001/3001764.png"),
    new Employee(1005, "Rana Saleh", "Development", "Junior", "https://cdn-icons-png.flaticon.com/128/4140/4140047.png"),
    new Employee(1006, "Hadi Ahmad", "Finance", "Mid-Senior", "https://cdn-icons-png.flaticon.com/128/4202/4202831.png")
];
let tbl = document.getElementsByTagName("tbody");
for(let i = 0; i < employees.length; i++){
    let emp = employees[i];
    tbl[0].innerHTML += `
    <tr>
    <td>${emp.id}</td>
    <td>${emp.fullName}</td>
    <td>${emp.department}</td>
    <td>${emp.level}</td>
    <td><img src="${emp.imageUrl}" alt="img"></td>
    <td>${emp.calculateSalary()}</td>
    <td>${emp.salary}</td>
    </tr>
    `;
}
console.log(tbl[0].innerHTML);



