//MODULE 3: SHOPPING CART ENGINE 



import { courses} from "./course.js";

const cart = [
  { courseId: 101, qty: 1 },
  { courseId: 103, qty: 2 }
];

//  -> Merge cart with courses to get full course info

let ncourses=cart.map((item)=>{ //cart elements then find the course
    let course=courses.find((course)=>course.id==item.courseId)
    return{
        ...course,
        qty:item.qty
    }
   //if you want to same array into all the object elements then do {...,...}
   //{... ,cart:{...cart}} //array will be appended into object
})
console.log(ncourses);

//  -> Calculate total cart amount

let total=ncourses.reduce((accumulator,element)=>accumulator+element.price*element.qty,0)
console.log(total);

//  -> Increase quantity of a course (immutably)

let increase=ncourses.map((course)=>{
    if(course.id==101){ //after merging there is no courseId
        return{...course,qty:course.qty+3}
    }
    else{
        return course
    }
})
console.log(increase);


//  -> Remove a course from cart
let remove=ncourses.filter((course)=>{ //map is used to extract while filter is used to remove
    if(course.id==103){
        return false
    }
    else{
        return true
    
    }
    
})
console.log(remove);

//  -> Check if all cart items are paid courses

let paid=ncourses.every((course)=>{
    if(course.published){
        return true
    }
    else{
        return false
    }
})
console.log(paid);
