import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <ul>
                <h3>Ejercicios</h3>
                <li>
                    <Link to="/santos">Crud - Api</Link>
                </li>
                <li>
                    <Link to="/songs">Search Songs</Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;
