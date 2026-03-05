import React from 'react'

function TasksCount({tasks}) {
  return(
    <div>
        <h3 className='text-2xl text-amber-200 mb-5'>TasksCount</h3>
        <p>{tasks.length}</p>
    </div>
  )
}

export default TasksCount