/*ASSIGNMENT 2:
-------------
Student Performance Dashboard

You are working on a college result analysis system.

Test Data:
const students = [
  { id: 1, name: "Ravi", marks: 78 },
  { id: 2, name: "Anjali", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 }
];

Tasks:
    1. filter() students who passed (marks ≥ 40)
    2. map() to add a grade field
              ≥90 → A
              ≥75 → B
              ≥60 → C
              else → D

   3. reduce() to calculate average marks
   4. find() the student who scored 92
   5. findIndex() of student "Kiran"*/

const students = [
  { id: 1, name: "Ravi", marks: 78 },
  { id: 2, name: "Anjali", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 }
];

let pass=students.filter((student)=>students.marks>=40)
console.log(pass);

let g=students.map((student)=>{   //if there is an if condition then we use student. whereas if we want to push something directly into the array of objects then we use var students ={...student,grade:"A"}
  if(student.marks>=90){
    return {...student,grade:"A"}  //alternative way is student.grade="A"; return student;
  }
  else if(student.marks>=75){
    return {...student,grade:"B"}
  }
  else if(student.marks>=60){
    return {...student,grade:"C"}
  }
  else{
    return {...student,grade:"D"}
  }
})
console.log(g);

let average=students.reduce((accumulator,student)=>accumulator+student.marks,0)/students.length
console.log(average);

let f=students.find((student)=>student.marks==92)
console.log(f);

let i=students.findIndex((student)=>student.name=="Kiran")
console.log(i);