import React from 'react'
import { useForm } from 'react-hook-form'
function AddTaskForm({addNewTask}) {
    const {register,handleSubmit,formState:{errors},reset}=useForm();
    const submitForm=(obj)=>{
        addNewTask(obj)
        reset()
    }
  return (
    <div className='w-72 bg-gray-50 p-6 rounded-2xl border'>
    <h3 className='text-blue-600 font-semibold text-lg mb-4'>Add Task</h3>
    <form onSubmit={handleSubmit(submitForm)}>
      <div className='mb-4'>
        <input
          type="text"
          {...register("title", { required: true, minLength: 3 })}
          placeholder="Enter title"
          className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.title?.type === "required" && <p className="text-red-500 text-sm mt-1">This field is required</p>}
        {errors.title?.type === "minLength" && <p className="text-red-500 text-sm mt-1">Min length violation</p>}
      </div>

      <div className='mb-4 flex flex-col gap-1'>
        <label className='text-sm text-gray-600 font-medium'>Priority</label>
        <div className='flex gap-4'>
          <label className='text-sm'><input type="radio" {...register("priority", { required: true })} value="Low" className="mr-1" />Low</label>
          <label className='text-sm'><input type="radio" {...register("priority", { required: true })} value="Medium" className="mr-1" />Medium</label>
          <label className='text-sm'><input type="radio" {...register("priority", { required: true })} value="High" className="mr-1" />High</label>
        </div>
        {errors.priority?.type === "required" && <p className="text-red-500 text-sm mt-1">This field is required</p>}
      </div>

      <div className='mb-4'>
        <select
          {...register("status", { required: true })}
          className="border rounded-lg px-3 py-2 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Not Completed">Not Completed</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition">
        Submit
      </button>
    </form>
  </div>
  )
}

export default AddTaskForm