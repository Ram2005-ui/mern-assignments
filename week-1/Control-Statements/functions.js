function priceTag(price){
    if(price<500){
        return "Budget Course";
    }
    else if(price>=500 && price<=1000){
        return "Standard Course";
    }else if(price>1000){
        return "Premium Course";
    }
    
}
courseTag=priceTag(1200);
console.log(courseTag);


//HANDS-ON 3: Enrollment Eligibility Checker
//-----------------------------------------
//Initial data:
//   let hasPaid = true;
//   let hasCompletedBasics = false;
//
//Tasks:
//  1. If both conditions are true → "Enroll Now"
//  2. Otherwise → "Complete Requirements"
//  3. Use ternary operator
//  4. Store result in enrollMessage
//  5. Print message


let hasPaid = true;
let hasCompletedBasics = false;

let enrollMessage = (hasPaid && !hasCompletedBasics) ? "Enroll Now" : "Complete Requirements";
console.log(enrollMessage);
