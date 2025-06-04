import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import './App.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div className='App'>
      <Navbar />
      <Outlet />
      <ToastContainer aria-label="Notifycation"   />
    </div>
  );
}

export default App;
