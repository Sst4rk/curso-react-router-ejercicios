import React from 'react';
import { useNavigate } from 'react-router-dom';

const SongTableRow = ({ id, el, handleDeleteSong }) => {
    let avatarStyles = {
        width: 'auto',
        height: '45px',
    };

    let navigate = useNavigate();
    let { bio, search } = el;
    let avatar = bio.artists[0].strArtistThumb;

    return (
        <tr>
            <td>
                <img style={avatarStyles} src={avatar} alt={search.artist} />
            </td>
            <td>{search.artist} </td>
            <td>{search.song} </td>
            <td>
                <button onClick={() => navigate(`/songs/cancion/${id}`)}>
                    Ver
                </button>
                <button onClick={() => handleDeleteSong(id)}>Eliminar</button>
            </td>
        </tr>
    );
};

export default SongTableRow;
