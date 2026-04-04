//Assignment 1: Date Creation & Extraction (Beginner)
//---------------------------------------------------
//Tasks:
//       1. Create a Date object for current date & time.
//       2. Extract and display:
//                    * Year
//                    * Month (human readable)
//                    * Date
//                    * Day of week
//                    * Hours, minutes, seconds
//
//      3. Display the date in this format:
//                    DD-MM-YYYY HH:mm:ss

let dateObj=new Date()
console.log(dateObj.getFullYear())
console.log((dateObj.getMonth()+1)) //months are 0-11
console.log(dateObj.getDate())
console.log(dateObj.getDay())
console.log(dateObj.getHours(),dateObj.getMinutes(),dateObj.getSeconds())


let dd=`${dateObj.getDate()}-${dateObj.getMonth()+1}-${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
console.log(dd)






//
//
//
//
//
//
//
//
//
//
//Assignment 2: Date Comparison & Validation (Beginner → Intermediate)
//--------------------------------------------------------------------
//
// Given:
     let enrollmentDeadline = new Date("2026-01-20");
//
//Tasks:
//  1.Check if:
//      * Today is before deadline → "Enrollment Open"
//      * Today is after deadline → "Enrollment Closed"
let today=new Date()
if(today<enrollmentDeadline){
    console.log("Enrollment Open")
}
else{
    console.log("Enrollment Closed")
}
//
//  2. Validate user input date:
//      * Input: "2026-02-30"
//      * Detect whether the date is valid or invalid

//let input=new Date("2026-02-30") //Javascript automatically corrects the invalid date
//therefore we have take input as a string
let input="2026-02-30"
let [year,month,date]=input.split("-")
let arr=[31,28,31,30,31,30,31,31,30,31,30,31] //array to store number of days in each month
if(year%4==0 && year%100!=0 || year%400==0){ //check for leap year
    arr[1]=29
}
if(date>=1 && date<=arr[month-1] && month>=1 && month<=12){
    console.log("Valid Date")
}
else{
    console.log("Invalid Date")
}




//
//
//
//
//
//
//
//
//
//
//
//
//Assignment 3: Age Calculator (Intermediate)
//-------------------------------------------
//Input:
//    let dob = "2000-05-15";
//
//
//Tasks:
//        1. Calculate exact age in years

let dob =new Date("2000-05-15");
let age=today.getFullYear()-dob.getFullYear()
if(dob.getMonth()>today.getMonth()){  //if month is greater then decrement age
    age--
}
else if(dob.getMonth()==today.getMonth()){ //if month is same then check date
    if(dob.getDate()>today.getDate()){
        age--
    }
}
console.log(age)



