//immutable (all primitives are immutable)
let a=10
a=a+10
console.log(a)

//a=10   a=a+10  => a=20
//value 10 is now dereferenced and 20 is assigned to a

//mutable (all objects are mutable) or reference types
let employee={
    empno:101,
    name:"Alice"
}

console.log(employee.empno)

//adding new property to the object
employee.city="New York"
console.log(employee)
//updating existing property
employee.name="Bob"
console.log(employee)

//deleting a property
delete employee.empno
console.log(employee)

//read keys
console.log(Object.keys(employee))
//read values
console.log(Object.values(employee))
//read entries
console.log(Object.entries(employee))

//freeze an object all properties become read-only
Object.freeze(employee)
employee.empno=102
console.log(employee) //empno will not be adde
//how to remove freeze






