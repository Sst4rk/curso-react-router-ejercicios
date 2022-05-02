import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route, Outlet } from 'react-router-dom';
import { helpHttp } from '../helpers/helpHttp';
import SongPage from '../pages/SongPage';
import Loader from './Loader';
import SongDetails from './SongDetails';
import SongForm from './SongForm';
import SongTable from './SongTable';

let mySongsInit = JSON.parse(localStorage.getItem('mySongs')) || [];

const SongSearch = ({ basePath = '/songs' }) => {
    // Inicio Variables de Estado

    const [search, setSearch] = useState(null);
    const [lyric, setLyric] = useState(null);
    const [bio, setBio] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mySongs, setMySongs] = useState(mySongsInit);

    // Fin Variables de Estado

    useEffect(() => {
        if (search === null) return;

        const fetchData = async () => {
            const { artist, song } = search;

            let artistURL = `https://theaudiodb.com/api/v1/json/2/search.php?s=${artist}`;
            let songURL = `https://api.lyrics.ovh/v1/${artist}/${song}`;

            setLoading(true);

            //console.log(artistURL, songURL);

            const [artistRes, songRes] = await Promise.all([
                helpHttp().get(artistURL),
                helpHttp().get(songURL),
            ]);

            //console.log(artistRes, songRes);
            setBio(artistRes);
            setLyric(songRes);

            setLoading(false);
        };

        fetchData();
        localStorage.setItem('mySongs', JSON.stringify(mySongs));
    }, [search, mySongs]);

    const handleSearch = (data) => {
        //console.log(data);
        setSearch(data);
    };

    const handleSaveSong = (setIsDisable) => {
        alert('Guardando la Cancion en Favoritos');
        let currentSong = {
            search,
            lyric,
            bio,
        };

        let songs = [...mySongs, currentSong];
        setMySongs(songs);
        setSearch(null);
        localStorage.setItem('mySongs', JSON.stringify(songs));
        setIsDisable(true);
    };

    const handleDeleteSong = (id) => {
        //alert(`Eliminando Cancion con el id: ${id}`);
        let isDelete = window.confirm(
            `Quieres Eliminar la Cancion con el id: ${id}`
        );

        if (isDelete) {
            let songs = mySongs.filter((el, index) => index !== id);
            setMySongs(songs);
            localStorage.setItem('mySongs', JSON.stringify(songs));
        }
    };

    return (
        <div>
            <header>
                <h2>Buscador de Canciones con Rutas</h2>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to={basePath}>Search</NavLink>
                </nav>
            </header>

            {loading && <Loader />}
            <article className="grid-1-2">
                <Routes>
                    <Route
                        path=""
                        element={
                            <>
                                <SongForm
                                    handleSearch={handleSearch}
                                    handleSaveSong={handleSaveSong}
                                />
                                <SongTable
                                    mySongs={mySongs}
                                    handleDeleteSong={handleDeleteSong}
                                />
                                {search && !loading && (
                                    <SongDetails
                                        search={search}
                                        lyric={lyric}
                                        bio={bio}
                                    />
                                )}
                            </>
                        }
                    />

                    <Route
                        path="cancion/:id"
                        element={
                            <>
                                {/* <h2>Pagina de Cancion</h2> */}
                                <SongPage mySongs={mySongs} />
                            </>
                        }
                    />
                    <Route path="*" element={<h2>404</h2>} />
                </Routes>
            </article>
        </div>
    );
};

export default SongSearch;
