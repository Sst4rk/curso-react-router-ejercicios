import { Route, Routes, NavLink, Outlet } from 'react-router-dom';
import './App.css';
import CrudApi from './components/CrudApi';
import SongSearch from './components/SongSearch';
import Home from './pages/Home';

function App() {
    return (
        <div>
            <h1>React-Router-Ejercicios</h1>

            <Routes>
                <Route path="/*" element={<Home />} />
                <Route
                    path="/santos/*"
                    element={<CrudApi basePath="/santos" />}
                />
                <Route
                    path="/songs/*"
                    element={<SongSearch basePath="/songs" />}
                />

                <Route path="*" element={<h3> 404</h3>} />
            </Routes>
        </div>
    );
}

export default App;
