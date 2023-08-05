import './App.css';
import { Link, Outlet } from "react-router-dom";
import axios from 'axios';
function App() {
    axios.defaults.baseURL = "http://localhost:5000/";
    return (
        <>
            <Outlet />
        </>
    );
}

export default App;
