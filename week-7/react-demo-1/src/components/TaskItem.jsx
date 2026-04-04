import React from 'react'

function TaskItem({ task, index, deleteTask, toggleComplete }) {
    return (
        <div className={`border-2 p-4 mb-3 rounded ${task.completed ? 'bg-green-100' : 'bg-white'}`}>
            <p className={`text-lg font-bold ${task.completed ? 'line-through text-gray-400' : ''}`}>
                {task.title}
            </p>
            <p className='text-sm text-gray-600'>Priority: {task.priority}</p>
            <p className='text-sm text-gray-600'>Status: {task.completed ? 'Completed' : 'Not Completed'}</p>

            <div className='flex gap-2 mt-3'>
                <button
                    onClick={() => toggleComplete(index)}
                    className='bg-green-500 text-white px-3 py-1 rounded text-sm'
                >
                    {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                    onClick={() => deleteTask(index)}
                    className='bg-red-500 text-white px-3 py-1 rounded text-sm'
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default TaskItem