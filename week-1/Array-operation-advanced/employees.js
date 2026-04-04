//ASSIGNMENT 3:
//-------------
//Employee Payroll Processor
//
//You are building a salary processing module in a company HR app.
//
//Test data:
//const employees = [
//  { id: 201, name: "Amit", salary: 45000, department: "IT" },
//  { id: 202, name: "Neha", salary: 60000, department: "HR" },
//  { id: 203, name: "Rahul", salary: 75000, department: "IT" },
//  { id: 204, name: "Pooja", salary: 30000, department: "Sales" }
//];
//
//Tasks:
//    1. filter() employees from IT department
//    2. map() to add:
//            netSalary = salary + 10% bonus
//
//    3. reduce() to calculate total salary payout
//    4. find() employee with salary 30000
//    5. findIndex() of employee "Neha"


let employees = [
  { id: 201, name: "Amit", salary: 45000, department: "IT" },
  { id: 202, name: "Neha", salary: 60000, department: "HR" },
  { id: 203, name: "Rahul", salary: 75000, department: "IT" },
  { id: 204, name: "Pooja", salary: 30000, department: "Sales" }
];

let r1=employees.filter((employee)=>employee.department=="IT")
console.log(r1);

employees=employees.map((employee)=>{
    return{
        ...employee,
        netSalary:employee.salary+employee.salary*0.1
    }
})
console.log(employees);

let total=employees.reduce((accumulator,employee)=>accumulator+employee.netSalary,0)
console.log(total);

let r10=employees.map((employee)=>{
    return{
        netSalary:employee.salary+employee.salary*0.1
    }
})
console.log(r10);

let t=employees.reduce((accumulator,employee)=>accumulator+employee.salary+employee.salary*0.1,0)
console.log(t);

let f = employees.find(employee => employee.salary === 30000)?.name
console.log(f);

let fi=employees.findIndex((employee)=>employee.name=="Neha")
console.log(fi);
