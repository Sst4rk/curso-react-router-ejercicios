import React, { useState } from 'react';

const initialForm = {
    artist: '',
    song: '',
};

const SongForm = ({ handleSearch, handleSaveSong }) => {
    const [form, setForm] = useState(initialForm);
    const [isDisable, setIsDisable] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.artist || !form.song) {
            alert('Datos Incompletos');
            setIsDisable(true);
            return;
        }

        handleSearch(form);
        setForm(initialForm);
        setIsDisable(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="artist"
                    placeholder="Nombre del Intérprete"
                    onChange={handleChange}
                    value={form.artist}
                    autoComplete="true"
                />
                <input
                    type="text"
                    name="song"
                    placeholder="Nombre de la Cancion"
                    onChange={handleChange}
                    value={form.song}
                />
                <input type="submit" value="Enviar" />
                <input
                    type="button"
                    value="Agregar Cancion"
                    onClick={() => handleSaveSong(setIsDisable)}
                    disabled={isDisable && 'disabled'}
                />
            </form>
        </div>
    );
};

export default SongForm;
