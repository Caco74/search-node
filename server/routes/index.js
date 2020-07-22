const storage = require('../storage')

const routes = (app) => {
    // devuelve toda la info
    app.get('/search', (req, res) => {
        storage.getDataAll()
            .then((info) => {
                res.json({ "error": false, "datos": info });
                console.log('Todos los datos');
                console.log(params.ciudadId);
            })
            .catch((err) => {
                res.json({ "error": true, "datos": err });
            });
    });

    // Devuelve las opciones para el filtrado
    app.get('/filteroptions', (req, res) => {
        console.log('fiteroptions !');
        storage.getDataAll()
            .then((info) => {
                let ciudades = [];
                let tipos = [];
                info.forEach((key, idx) => {
                    if (ciudades.indexOf(key.Ciudad) < 0) {
                        console.log(key.Ciudad);
                        ciudades.push(key.Ciudad);
                    }
                    if (tipos.indexOf(key.Tipo) < 0) {
                        tipos.push(key.Tipo);
                    }
                });
                res.json({ "error": false, "ciudades": ciudades, "tipos": tipos });
            })
            .catch((err) => {
                res.json({ "error": true, "err": err });
            });
    });

    // Devuelve la info filtrada
    app.get('/ciudad/:ciudadId/tipo/:tipoId/desde/:desdeVal/hasta/:hastaVal', (req, res) => {
        let params = req.params;
        // let datos = [];
        storage.getDataAll()
            .then(info => {
                var aux = [];
                var arr2 = [];
                var datos = [];

                aux = info.slice();
                
                if (params.ciudadId != "todas") {
                    aux.forEach((key, idx) => {
                        if (key.Ciudad == params.ciudadId) {
                            arr2.push(key);
                        }
                    });
                } else {
                    arr2 = aux.slice();
                }

                aux = [];
                aux = arr2.slice();
                arr2 = [];

                if (params.tipoId != "todos") {
                    //valida y filtra segun el tipo
                    aux.forEach((key, idx) => {
                        if (key.Tipo == params.tipoId) { arr2.push(key); }
                    });
                } else {
                    arr2 = aux.slice();
                }

                // recorre y filtra si esta entre los valores seleccionados
                arr2.forEach((key, idx) => {
                    let valor = parseInt(key.Precio.replace("$", "").replace(",", ""));
                    if (valor >= parseInt(params.desdeVal) && valor <= parseInt(params.hastaVal)) {
                        datos.push(key);
                    }
                });

                res.status(200).json({ datos, params });
                console.log('Datos Filtrados');
            })
            .catch((err) => {
                res.json({ "error": true, "err": err });
            });
    });

    // Devuelve la info filtrada de la ciudad seleccionada
    app.get('/ciudad/tipo/:tipoId/desde/:desdeVal/hasta/:hastaVal', (req, res) => {
        let params = req.params;
        // let datos = [];
        storage.getDataAll()
            .then(info => {
                var aux = [];
                var arr2 = [];
                var datos = [];

                aux = info.slice();

                if (params.tipoId != "todos") {
                    //valida y filtra segun el tipo
                    aux.forEach((key, idx) => {
                        if (key.Tipo == params.tipoId) { arr2.push(key); }
                    });
                } else {
                    arr2 = aux.slice();
                }

                // recorre y filtra si esta entre los valores seleccionados
                arr2.forEach((key, idx) => {
                    let valor = parseInt(key.Precio.replace("$", "").replace(",", ""));
                    if (valor >= parseInt(params.desdeVal) && valor <= parseInt(params.hastaVal)) {
                        datos.push(key);
                    }
                });

                res.status(200).json({ datos, params });
                console.log('Datos Filtrados');
            })
            .catch((err) => {
                res.json({ "error": true, "err": err });
            });
    });

    // Devuelve la info filtrada con todo los tipos de casa seleccionada
    app.get('/ciudad/:ciudadId/tipo/desde/:desdeVal/hasta/:hastaVal', (req, res) => {
        let params = req.params;
        // let datos = [];
        storage.getDataAll()
            .then(info => {
                var aux = [];
                var arr2 = [];
                var datos = [];

                aux = info.slice();
                
                if (params.ciudadId != "todas") {
                    aux.forEach((key, idx) => {
                        if (key.Ciudad == params.ciudadId) {
                            arr2.push(key);
                        }
                    });
                } else {
                    arr2 = aux.slice();
                }
                arr2.forEach((key, idx) => {
                    let valor = parseInt(key.Precio.replace("$", "").replace(",", ""));
                    if (valor >= parseInt(params.desdeVal) && valor <= parseInt(params.hastaVal)) {
                        datos.push(key);
                    }
                });

                res.status(200).json({ datos, params });
                console.log('Datos Filtrados');
            })
            .catch((err) => {
                res.json({ "error": true, "err": err });
            });
    });

    // Devuelve la info filtrada solo con rango de precio
    app.get('/ciudad/tipo/desde/:desdeVal/hasta/:hastaVal', (req, res) => {
        let params = req.params;
        // let datos = [];
        storage.getDataAll()
        .then(info => {
            var aux = [];
            var arr2 = [];
            var datos = [];

            aux = info.slice();
            
            if (params.ciudadId === "todas") {
                aux.forEach((key, idx) => {
                    if (key.Ciudad == params.ciudadId) {
                        arr2.push(key);
                    }
                });
            } else {
                arr2 = aux.slice();
            }

            aux = [];
            aux = arr2.slice();
            arr2 = [];

            if (params.tipoId === "todos") {
                //valida y filtra segun el tipo
                aux.forEach((key, idx) => {
                    if (key.Tipo == params.tipoId) { arr2.push(key); }
                });
            } else {
                arr2 = aux.slice();
            }

            // recorre y filtra si esta entre los valores seleccionados
            arr2.forEach((key, idx) => {
                let valor = parseInt(key.Precio.replace("$", "").replace(",", ""));
                if (valor >= parseInt(params.desdeVal) && valor <= parseInt(params.hastaVal)) {
                    datos.push(key);
                }
            });

            res.status(200).json({ datos, params });
            console.log('Datos Filtrados');
        })
            .catch((err) => {
                res.json({ "error": true, "err": err });
            });
    });

    
};

module.exports = routes;