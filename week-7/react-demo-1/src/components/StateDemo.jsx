import { useState } from "react";

function StateDemo() {
  let [counter, setCounter] = useState(10);
  let [marks, setMarks] = useState([10, 20, 30, 40, 50]);
  let [user,setUser]=useState({
    email:'test@gmail.com',
    age:56
  })
  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);
  const reset = () => setCounter(0);
  

  // Insert at beginning
  const addAtBeginning = () => setMarks([60, ...marks]);

  // Insert at end
  const addAtEnd = () => setMarks([...marks, 90]);

  // Insert in between (middle index)
  const addInBetween = () => {
    const midIndex = Math.floor(marks.length / 2);
    const newMarks = [...marks];
    newMarks.splice(midIndex, 0, 100); // inserts 100 at index midIndex  //original array is modified
    setMarks(newMarks);
  };

  // Delete from end
  const deleteFromEnd = () => setMarks(marks.slice(0, -1));

//delete mark at index
   const deleteAt=(index)=> {
    let result=marks.filter((mark,i)=>i!==index);
    setMarks(result);
  }
  // update user property
  const updateUser=()=>setUser({...user,age:100})  //better method to use the spread operator


//delete objects dynamically
const deleteUser=()=>{    //dont use the dot operator
    //cannot use delete user.email
    let {email,...rest}=user;
    setUser(rest);
}


  return (
    <div className="p-6 flex flex-col items-center">

      <h1 className="text-2xl font-bold text-black mb-4">Counter: {counter}</h1>

      <div className="flex gap-3 mb-4">
        <button onClick={increment} className="bg-amber-200 px-4 py-1 rounded">+</button>
        <button onClick={decrement} className="bg-amber-200 px-4 py-1 rounded">-</button>
        <button onClick={reset}     className="bg-amber-200 px-4 py-1 rounded">Reset</button>
      </div>

      <div className="flex flex-col gap-2 mb-6 w-fit">
        <button onClick={addAtBeginning} className="bg-green-400 px-4 py-1 rounded">Add at Beginning</button>
        <button onClick={addAtEnd}       className="bg-green-400 px-4 py-1 rounded">Add at End</button>
        <button onClick={addInBetween}   className="bg-blue-400  px-4 py-1 rounded">Add in Between</button>
        <button onClick={deleteFromEnd}  className="bg-red-400   px-4 py-1 rounded">Delete from End</button>
        <button onClick={()=>deleteAt(2)} className="bg-amber-300 px-4 py-1 rounded">Delete At Index</button>
        <button onClick={updateUser} className="bg-amber-300 px-4 py-1 rounded">Update User</button>
        <button onClick={deleteUser} className="bg-amber-300 px-4 py-1 rounded">Delete User</button>
        {/* // for reading and displaying data */}
        {Object.entries(user).map(([key, value]) => (
      <p key={key}>{key}: {value}</p>
    ))}

      </div>

      <div className="flex flex-col gap-1">
        {marks.map((mark, index) => (
          <p key={index} className="text-gray-700">
            {mark}
          </p>
))}
      </div>

    </div>
  );
}

export default StateDemo;