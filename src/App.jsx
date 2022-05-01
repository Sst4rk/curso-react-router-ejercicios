import './App.css';
import CrudApi from './components/CrudApi';
import SongSearch from './components/SongSearch';

function App() {
    return (
        <div>
            <h1>React-Router-Ejercicios</h1>
            <hr />
            <SongSearch />
            <hr />
            <CrudApi />
            <hr />
        </div>
    );
}

export default App;
