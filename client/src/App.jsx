import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Query from "./pages/Ticket-Page";
import Home from "./pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Notification from "./components/notification.js";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Notification /> */}
        <Routes>        
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/query" element={<Query />} />
          <Route path="/user/home" element={< Home/>} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
