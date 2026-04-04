import React from 'react'
import {useForm} from "react-hook-form";
function AddTasks({addNewTask}){
    // Receives the addNewTask function as a prop.
    const {register,handleSubmit,reset}=useForm();
    const submitForm=(obj)=>{
        addNewTask(obj)
        reset()
    }
    // It calls addNewTask(obj) which goes back up to TaskManager and updates the tasks array. Then reset() clears the input field.
    
  return(
    <div>
        <h1 className='text-3xl text-blue-400 mb-10'>AddTasks</h1>
        <form onSubmit={handleSubmit(submitForm)}>
            <div className='mb-3'>
            <input type="text" {...register("taskname")} id="taskname" placeholder="Enter text" className="border-2"/>
            </div>
            <button type="submit" className="bg-blue-500 text-white">Submit</button>
            
        </form>
    </div>
  )
}

export default AddTasks