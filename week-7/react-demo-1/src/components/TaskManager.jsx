import React from 'react'
import AddTasks from './AddTasks'
import TasksCount from './TasksCount'
import TasksList from './TasksList'
import AddTaskForm from './AddTaskForm'
import { useState } from 'react'
function TaskManager() {
    let [tasks,setTasks]=useState([]);
    const addNewTask=(taskObj)=>{
        setTasks([...tasks,taskObj]);
    }
    const deleteTask = (index) => {
        let result = tasks.filter((task, i) => i !== index);
        setTasks(result);
    }
    const toggleComplete = (index) => {
        let updated = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updated);
    }

  return (
        <div className='max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8'>
    <div className='flex justify-between items-center mb-6'>
      <h1 className='text-3xl font-bold text-blue-500'>Task Manager</h1>
      <div className='text-right'>
        <p className='text-gray-600'>Total Tasks: {tasks.length}</p>
        <p className='text-gray-600'>Completed: {tasks.filter(t => t.completed).length}</p>
      </div>
    </div>
    <div className='flex gap-10'>
      <AddTaskForm addNewTask={addNewTask} />
      <TasksList tasks={tasks} deleteTask={deleteTask} toggleComplete={toggleComplete} />
    </div>
  </div>
    )
}

export default TaskManager