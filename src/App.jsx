import './App.css';
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from 'axios';
function App() {
    // axios.defaults.baseURL = "http://localhost:5000/";
    axios.defaults.baseURL = "https://easy-form-server.onrender.com";
    const location = useLocation();
    return (
        <>
            <header className='bg-orange-400 p-4'>
                <div className="container mx-auto flex justify-between">
                    <h1 className="text-white md:text-4xl text-lg"><Link to={'/'}>Easy Form</Link></h1>
                    {
                        location.pathname.includes("preview") ? '' : (
                            <nav className=''>
                                <Link className="me-2 text-white" to={'/forms'}>Forms</Link>
                                <Link className="me-2 text-white" to={'/create-form'}>Create Form</Link>
                            </nav>
                        )
                    }
                </div>
            </header>
            <Outlet />
        </>
    );
}

export default App;
