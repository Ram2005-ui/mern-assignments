import {useForm} from "react-hook-form";
import { useState } from "react";
function UserReg(){
    const {register,handleSubmit,formState:{errors}}=useForm();
    const [users,setUsers]=useState([]);
    const submitForm=(obj)=>{
        console.log(obj);
        setUsers([...users,obj]);

    }
    return(
        <div className="bg-pink-700 flex flex-col justify-center items-center mb-4">
            <h1>User registration Form</h1>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className="mb-2">
                <input type="text" {...register("firstname",{required:true,minLength:4,maxLength:6})} id="firstname" placeholder="Enter First Name" className="border-2"/>
                {
                    errors.firstname?.type==="required" && <p className="text-red-500">This field is required</p>
                }
                {
                    errors.firstname?.type==="minLength" && <p className="text-red-500">Min length violation</p>
                }
                {
                    errors.firstname?.type==="maxLength" && <p className="text-red-500">Max length violation</p>
                }
                </div>
                <div className="mb-2">
                <input type="text" {...register("lastname",{required:true,minLength:4,maxLength:6})} id="lastname" placeholder="Enter Last Name" className="border-2"/>
                {
                    errors.lastname?.type==="required" && <p className="text-red-500">This field is required</p>
                }
                {
                    errors.lastname?.type==="minLength" && <p className="text-red-500">Min length violation</p>
                }
                {
                    errors.lastname?.type==="maxLength" && <p className="text-red-500">Max length violation</p>
                }
                </div>
                <div className="mb-2">
                <input type="email" {...register("email",{required:true})} id="email" placeholder="Enter email" className="border-2"/>
                {
                    errors.email?.type==="required" && <p className="text-red-500">This field is required</p>
                }
                </div>
                <div className="mb-2">
                    <input type="date" {...register("dob", {
                        required: true,
                        validate: (value) => {
                            const year = new Date(value).getFullYear();
                            return year < 2020 || "Date of Birth should be less than 2020";
                        }
                    })} className="border-2" />
                    {errors.dob?.type === "required"  && <p className="text-red-500">This field is required</p>}
                    {errors.dob?.type === "validate"  && <p className="text-red-500">{errors.dob.message}</p>}
                </div>
                <button type="submit" className="bg-yellow-300 text-black">Add New User</button>

            </form>
            <h1>Users List</h1>
            <table className="border-2 border-black cellspacing-2 cellpadding-2">
                <thead>
                    <tr>
                        <th className="border">First Name</th>
                        <th className="border">Last Name</th>
                        <th className="border">Email</th>
                        <th className="border">DOB</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((userObj,index)=>
                            <tr key={index}>
                                <td className="border">{userObj.firstname}</td>
                                <td className="border">{userObj.lastname}</td>
                                <td className="border">{userObj.email}</td>
                                <td className="border">{userObj.dob}</td>
                            </tr>
                        )
                    }
                    
                </tbody>
            </table>


        </div>

    )
}
export default UserReg;