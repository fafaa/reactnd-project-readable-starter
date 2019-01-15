'use strict';
module.exports = function(app) {
    var ctrl = require('./controllers');
    const bodyParser = require('body-parser');

    app.post('/set', bodyParser.json(), (req, res) => {
        console.log('!!!!!!!!!!!!req', req.body)
        ctrl.set(req.body)
            .then(
                (data) => res.send(data),
                (error) => {
                    console.error(error)
                    res.status(500).send({
                        error: 'There was an error.'
                    })
                }
            )
    });

    app.get('/list', (req, res) => {
        ctrl.listGet().then(
            (data) => res.send(data),
            (error) => {
                console.error(error);
                res.status(500).send({
                    error: 'There was an error.'
                });
            }
        );
    });

    app.get('/list_art', (req, res) => {
        //przyjmuje miesiac lub obecny miesiac jako default
        //lista od najlepszego do najgorszego
        //3 kolumny: zaangazowanie (suma punktow bez time score), jak performuje (timescore z paramsow),
        // sumaryczny (mnozenie cos tam jedno i drugie)
        //z limitem 100
        //pod osobnym kluczem moj wynik
        ctrl.listArt().then(
            (data) => res.send(data),
            (error) => {
                console.error(error);
                res.status(500).send({
                    error: 'There was an error.'
                });
            }
        );
    });

    app.get('/scores', (req, res) => {
        //najlepsza trojka za seo, performance, cos trzeciego
        //ma przyjmowac miesiac
        ctrl.scores().then(
            (data) => res.send(data),
            (error) => {
                console.error(error);
                res.status(500).send({
                    error: 'There was an error.'
                });
            }
        );
    });

    app.get('*', function(req, res){
        res.status(404).send({"info": "Url does not exist."})
    });
    app.post('*', function(req, res){
        res.status(404).send({"info": "Url does not exist."})
    });
};