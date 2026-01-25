//       ii. task.js - Task operations
//                    // TODO: Import validator functions
//                    // import { ... } from './validator.js';
import { validateTitle,validateDueDate,validatePriority } from './validator.js';

//                    
//                    const tasks = [];
const tasks = [];
//                    
//                    // 1. Add new task
//                    function addTask(title, priority, dueDate) {
//                      // Validate using imported functions
//                      // If valid, add to tasks array
//                      // Return success/error message
//                    }
function addTask(title, priority, dueDate) {
    const dateobj=new Date(dueDate) //converting string to dateobj
    if(validateTitle(title) && validatePriority(priority) && validateDueDate(dateobj)){
      tasks.push({ id: tasks.length + 1, title, priority, dueDate:dateobj, completed: false});
      return "Task added successfully";
    }
    return "Invalid input";
  }
//                    
//                    // 2. Get all tasks
//                    function getAllTasks() {
//                      // Return all tasks
//                    }

function getAllTasks() {
    return tasks;
  }
//                    
//                    // 3. Mark task as complete
//                    function completeTask(taskId) {
//                      // Find task and mark as complete
//                    }
function completeTask(taskId) {
    const task = tasks.find((task) => task.id === taskId);  //using find method
    if (task) {
      task.completed = true; //marking task as complete
      return "Task marked as complete";
    }
    return "Task not found";
  }
//
//                  // Export functions
export { addTask, getAllTasks, completeTask };
//
