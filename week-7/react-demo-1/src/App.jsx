import './App.css'
//import StateDemo from './components/StateDemo'
import TaskManager from './components/TaskManager'
// import Test1 from './components/Test1'
// import Test2 from './components/Test2'
//import FormDemo from './components/FormDemo'
//import UserReg from './components/UserReg'

function App(){   //component same as name of the file
    //state(optional)
    
    //return a react element(mandatory)
    return(   //not an html element but jsx element
      <div className='m-16 bg-blue-400 border-2 flex justify-between'>
        {/* <h1 className='text-2xl text-amber-200'>hello world</h1>   */}
         <TaskManager/> 
        {/* {<StateDemo/>} */}
        {/* nesting of Test1 component into App component */}
      </div>
    )
}


export default App


//JSX Javascript syntax extension