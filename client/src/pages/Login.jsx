import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdMail } from "react-icons/md";

function Login() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="h-screen flex flex-col items-center justify-center text-white bg-no-repeat bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('./src/assets/BG.gif')" }}
    >
      <div className="bg-gradient-to-t from-pink-500 via-violet-600 to-purple-700 p-8 rounded-lg w-96 transition-all duration-500 opacity-80">
        {open ? <LoginForm setOpen={setOpen} /> : <RegisterForm setOpen={setOpen} />}
      </div>
    </div>
  );
}

function RegisterForm({ setOpen }) {
  return (
    <div className="transition-opacity duration-500">
      <h2 className="text-3xl font-bold pb-6 text-center">Register</h2>
      <form className="flex flex-col">
        <InputField type="text" placeholder="Username" icon={<FaUser />} />
        <InputField type="email" placeholder="Email" icon={<MdMail />} />
        <InputField type="password" placeholder="Password" icon={<FaLock />} />
        <button className="my-2 py-2 w-full rounded-full bg-blue-700 hover:bg-blue-800 transition">Register</button>
        <span className="text-center">
          Already have an account?
          <span onClick={() => setOpen(true)} className="cursor-pointer text-gray-300 underline"> Login</span>
        </span>
      </form>
    </div>
  );
}

function LoginForm({ setOpen }) {
  return (
    <div className="transition-opacity duration-500">
      <h2 className="text-3xl font-bold pb-6 text-center">Login</h2>
      <form className="flex flex-col">
        <InputField type="text" placeholder="Username" icon={<FaUser />} />
        <InputField type="password" placeholder="Password" icon={<FaLock />} />
        <button className="my-2 py-2 w-full rounded-full bg-blue-700 hover:bg-blue-800 transition">Login</button>
        <span className="text-center">
          Don't have an account?
          <span onClick={() => setOpen(false)} className="cursor-pointer text-gray-300 underline"> Register</span>
        </span>
      </form>
    </div>
  );
}

function InputField({ type, placeholder, icon }) {
  return (
    <div className="relative w-full">
      <input type={type} className="border border-gray-300 w-full rounded-full py-2 px-4 pl-10 my-2 bg-transparent focus:outline-none" placeholder={placeholder} />
      <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300">{icon}</span>
    </div>
  );
}

export default Login;
