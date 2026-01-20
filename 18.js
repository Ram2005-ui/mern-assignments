const marks = [78, 92, 35, 88, 40, 67];
let r18=marks.filter((element)=>element>=40)
console.log(r18)

let r19=marks.map((element)=>element+5)
console.log(r19)

let r20=marks.reduce((accumulator,element)=>accumulator>element?accumulator:element)
console.log(r20)


let r21=marks.find((element)=>element<40)
console.log(r21)

let r22=marks.findIndex((element)=>element==92)
console.log(r22)