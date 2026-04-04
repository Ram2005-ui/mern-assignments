const temperatures = [32, 35, 28, 40, 38, 30, 42];
let r13=temperatures.filter((element)=>element>35)
console.log(r13)
let f=[]
//convert celsius to fahrenheit

let r14=temperatures.map((element)=>element*9/5+32)
console.log(r14)

let r15=temperatures.reduce((accumulator,element)=>accumulator+element,0)
console.log(r15/temperatures.length) //average temperature

let r16=temperatures.find((element)=>element>40)
console.log(r16)

let r17=temperatures.findIndex((element)=>element==28)
console.log(r17)
