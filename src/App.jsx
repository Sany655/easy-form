import './App.css';
import { Link, Outlet } from "react-router-dom";
function App() {
    return (
        <>
            <nav>
                <Link to={'/'}>Go to preview</Link>
            </nav>
            <Outlet />
        </>
    );
}

export default App;
