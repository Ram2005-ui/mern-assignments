//      iii. app.js - Main application
//                  // TODO: Import task functions
//                  // import { ... } from './task.js';
//                  // Test your module system
//                  // 1. Add some tasks
//                  // 2. Display all tasks
//                  // 3. Complete a task
//                  // 4. Display all tasks again

import { addTask, getAllTasks, completeTask } from './task.js';


// Add tasks
addTask("Task 1", "high", "2026-09-01");
addTask("Task 2", "medium", "2026-08-30");
addTask("Task 3", "low", "2026-09-05");

// Display all tasks
const allTasks = getAllTasks();
console.log("All Tasks:");
console.log(allTasks);

// Complete a task
completeTask(1);

// Display all tasks again
const updatedTasks = getAllTasks();
console.log("Updated Tasks:");
console.log(updatedTasks);
