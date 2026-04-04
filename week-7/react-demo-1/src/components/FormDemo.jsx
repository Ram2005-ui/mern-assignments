import {useForm} from "react-hook-form";

function FormDemo(){
    const {register,handleSubmit,formState:{errors}}=useForm();  //it returns an object
    //register is a function that connects input to form and set validation rules
    //handleSubmit is a function that handles form submission runs validation and calls submitForm
    //
    const submitForm=(obj)=>{
        console.log(obj);
    }
    return(
        <div>
            <h1>Form</h1>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className="mb-2">
                <input type="text" {...register("username",{required:true,minLength:3})} id="username" placeholder="Enter text" className="border-2"/>
                {/* register is just a function that returns an object of props: */}
                {/* {
  name: "username",
  onChange: function(event) { ... },
  onBlur: function(event) { ... },
  ref: function(element) { ... }
} */}
{/* ref — gives react-hook-form direct access to the actual input element in the browser */}

                {
                    errors.username?.type==="required" && <p className="text-red-500">This field is required</p>
                }
                {/* It's like putting a security camera on the input. Before spread, the input is unmonitored. After spread, react-hook-form sees everything that happens inside it. */}
                {
                    errors.username?.type==="minLength" && <p className="text-red-500">Min length violation</p>
                }
                </div>
                <div className="mb-2">
                <input type="email" {...register("email")} id="email" placeholder="Enter email" className="border-2"/>
                </div>
                <button type="submit" className="bg-blue-500 text-white">Submit</button>

            </form>
        </div>
    )
}
export default FormDemo;