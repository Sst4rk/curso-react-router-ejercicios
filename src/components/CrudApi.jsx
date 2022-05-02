import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Routes, Route } from 'react-router-dom';
import { helpHttp } from '../helpers/helpHttp';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import Loader from './Loader';
import Menssaje from './Message';

const CrudApi = ({ basePath = '/santos' }) => {
    const [db, setDb] = useState(null);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let api = helpHttp();
    let url = 'http://localhost:5000/santos';

    /* Ejecucion Principal de la peticion y estableciendo los valores por default */
    useEffect(() => {
        setLoading(true);
        helpHttp()
            .get(url)
            .then((res) => {
                //console.log(res);

                if (!res.err) {
                    setDb(res);
                    setError(null);
                } else {
                    setDb(null);
                    setError(res);
                }

                setLoading(false);
            });
    }, [url]);

    const createData = (data) => {
        data.id = Date.now();

        let options = {
            body: data,
            headers: { 'content-type': 'application/json' },
        };

        api.post(url, options).then((res) => {
            console.log(res);

            if (!res.err) {
                setDb([...db, res]);
            } else {
                setError(res);
            }
        });
    };

    const updateData = (data) => {
        let endpoint = `${url}/${data.id}`;

        let options = {
            body: data,
            headers: { 'content-type': 'application/json' },
        };

        api.put(endpoint, options).then((res) => {
            if (!res.err) {
                let newData = db.map((el) => (el.id === data.id ? data : el));
                setDb(newData);
            } else {
                setError(res);
            }
        });
    };

    const deleteData = (id) => {
        let isDelete = window.confirm(
            `¿Estas seguro de eliminar el registro con el id ${id}?`
        );

        if (isDelete) {
            let endpoint = `${url}/${id}`;

            let options = {
                headers: { 'content-type': 'application/json' },
            };

            api.del(endpoint, options).then((res) => {
                if (!res.err) {
                    let newData = db.filter((el) => el.id !== id);
                    setDb(newData);
                } else {
                    setError(res);
                }
            });
        } else {
            return;
        }
    };

    return (
        <div className="crudApp">
            <header>
                <h2>CRUD API con Rutas</h2>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to={basePath}>Santos</NavLink>
                    <NavLink to={`${basePath}/agregar`}>Agregar</NavLink>
                </nav>
            </header>

            <Routes>
                <Route
                    path=""
                    element={
                        <>
                            {loading && <Loader />}
                            {error && (
                                <Menssaje
                                    msg={`Error ${error.status}:${error.statusText}`}
                                    bgColor="#dc3545"
                                />
                            )}

                            {db && (
                                <CrudTable
                                    data={db}
                                    setDataToEdit={setDataToEdit}
                                    deleteData={deleteData}
                                />
                            )}
                        </>
                    }
                />
                <Route
                    path="agregar"
                    element={
                        <CrudForm
                            createData={createData}
                            updateData={updateData}
                            dataToEdit={dataToEdit}
                            setDataToEdit={setDataToEdit}
                        />
                    }
                />
                <Route
                    path="editar/:id"
                    element={
                        <CrudForm
                            createData={createData}
                            updateData={updateData}
                            dataToEdit={dataToEdit}
                            setDataToEdit={setDataToEdit}
                        />
                    }
                />

                <Route path="*" element={<h2>404</h2>} />
            </Routes>
            {/* <Outlet /> */}
            {/* crear */}
        </div>
    );
};

export default CrudApi;
