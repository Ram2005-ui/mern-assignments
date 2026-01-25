//MODULE 2: COURSE CATALOG ENGINE







const courses = [
  { id: 101, title: "JavaScript", price: 999, published: true },
  { id: 102, title: "React", price: 1499, published: false },
  { id: 103, title: "Node", price: 1299, published: true }
];

//  -> Get published courses
let publishedCourses = courses.filter((course) => course.published);
console.log(publishedCourses);

//  -> Sort courses by price (high → low)
let sorted=[...courses].sort((a,b)=>b.price-a.price) //sort in descending order sort method is used
console.log(sorted) //to avoid original mutation of the array

//  -> Extract { title, price } only
let extract=courses.map((course)=>{
    return {title:course.title,price:course.price}
})
console.log(extract)

//  -> Calculate total value of published courses

let totalValue=publishedCourses.reduce((accumulator,element)=>accumulator+element.price,0)
console.log(totalValue)

//  -> Add a new course immutably

let newCourse={id:104,title:"MongoDB",price:1999,published:true}  
let newCourses=[...courses,newCourse]  //spread operator
console.log(newCourses)

export {courses}

