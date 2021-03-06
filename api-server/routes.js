'use strict';
module.exports = function(app) {
    var ctrl = require('./controllers');
    const bodyParser = require('body-parser');

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });


    app.post('/set', bodyParser.json(), (req, res) => {
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
    app.post('/set_new', bodyParser.json(), (req, res) => {
        ctrl.setNew(req.body)
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
        ctrl.listGet(req.query).then(
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
        ctrl.listArt(req.query).then(
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
        ctrl.scores(req.query).then(
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