const courses = ["javascript", "react", "node", "mongodb", "express"];
let r1=courses.filter((element) => element.length > 5);
console.log(r1);

let r2=courses.map((element) => element.toUpperCase());
console.log(r2);

//concatenate all course names into a single string

let r3=courses.reduce((accumulator,element)=>accumulator+" "+"|"+" "+element)
console.log(r3)



let r4=courses.find((element)=>element=="react")
console.log(r4);

let r5=courses.findIndex((element)=>element=="node")
console.log(r5);
