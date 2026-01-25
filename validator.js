//Assignment 1: 
//-------------
//Task Management System (ToDo App Modules):
//     Building a task manager like Todoist
//
//Requirements:
//     Create a modular todo app with 3 separate files:
//
//       
//          
//        i. validator.js - Input validation
//                      // TODO: Export these validation functions
//                      
//                      // 1. Validate task title (not empty, min 3 chars)
//                      function validateTitle(title) {
//                        // Your code here
//                      }
function validateTitle(title) {
    if(title!=="" && title.length >= 3) {
      return true;
    }
    return false;
}
//                      
//                      // 2. Validate priority (must be: low, medium, high)
//                      function validatePriority(priority) {
//                        // Your code here
//                      }
function validatePriority(priority) {
    if(priority === "low" || priority === "medium" || priority === "high") {
      return true;
    }
    return false;
}
//                      
//                      // 3. Validate due date (must be future date)
//                      function validateDueDate(date) {
//                        // Your code here
//                      }

function validateDueDate(date) { //validators should only validate they need not change data types 
    let today = new Date(); //this should be inside the function because it is dependent on the current date if we place it outside the function then it will always return true because it will always be greater than the current date
    if(date > today) { // string to dateobj  conversion need not be done here
      return true;
    }
    return false;
}

export { validateTitle, validatePriority, validateDueDate };
  
//
//
//

//

//





