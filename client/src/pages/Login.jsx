import React from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

function Login() {

  const [open, setOpen] = useState(false);
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center text-white">
      <div className="h-[300px] w-8- bg-blue-600 px-6 my-4">
        <div>
          <h2 className="text-3xl font-blod pb-6 text-center">Register</h2>
          <form className="flex flex-col items-center" action="">
            <div className="w-full relative">
              <input type="text" className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent" placeholder="Username" />
              <FaUser/>
            </div>
            <div className="w-full">
              <input type="email" className="border border-gray-200 w-full  rounded-full py-2 px-4 my-2 bg-transparent" placeholder="Email" />

            </div>
            <div className="w-full">
              <input type="password" className="border border-gray-200 w-full  rounded-full py-2 px-4 my-2 bg-transparent" placeholder="Password" />

            </div>
            <button className="my-2 py-2 w-full rounded-full bg-blue-600">Register</button>
            <span>Already have an account? <span>Login</span></span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;