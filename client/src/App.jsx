import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Query from "./pages/Ticket-Page";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Landing from "./pages/Landing";
// import Notification from "./components/notification.js";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Notification /> */}
        <Routes>  
          <Route path="/" element={<Landing/>}/>      
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/home" element={<Home />} />
          <Route path="/user/createTicket" element={<Query />} />
          <Route path="/user/getTickets" element={<Dashboard />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;