import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import './App.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from './Context/userAuth';


function App() {
  return (
    <div className='App'>
      <UserProvider>
        <Navbar />
        <Outlet />
        <ToastContainer aria-label="Notifycation"   />
      </UserProvider>
    </div>
  );
}

export default App;
