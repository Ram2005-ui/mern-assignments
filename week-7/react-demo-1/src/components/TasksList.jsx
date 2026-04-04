import React from 'react'
import TaskItem from './TaskItem'

function TasksList({ tasks, deleteTask, toggleComplete }) {
    if (tasks.length === 0) {
        return (
            <div>
                <h3 className='text-xl text-blue-600 mb-4'>Tasks List</h3>
                <p className='text-gray-500'>No tasks found. Add one!</p>
            </div>
        )
    }

    return (
        <div>
            <h3 className='text-xl text-blue-600 mb-4'>Tasks List</h3>
            {tasks.map((task, index) => (
                <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    deleteTask={deleteTask}
                    toggleComplete={toggleComplete}
                />
            ))}
        </div>
    )
}

export default TasksList