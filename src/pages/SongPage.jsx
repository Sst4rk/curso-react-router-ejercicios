import React from 'react';
import { useParams } from 'react-router-dom';
import SongDetails from '../components/SongDetails';

const SongPage = ({ mySongs }) => {
    let { id } = useParams();
    localStorage.getItem('mySongs');
    let currentSong = mySongs[id];
    let { search, lyric, bio } = currentSong;
    return <SongDetails search={search} lyric={lyric} bio={bio} />;
};

export default SongPage;
