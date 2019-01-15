var db = require('./database.js').db;

console.log('!!!!!!!!!!!!DB', db)
exports.set = function(body) {
    // params, uuid_art, title_art, author
    return new Promise((res) => {
        let uuid = db.setEl(body);
        res({uuid_art: uuid});
    });

};

exports.listGet = function(req, res) {
    return new Promise((res) => {
        res(db.getEl())
    });
};

exports.listArt = function(req, res) {
    return new Promise((res) => {
        res('list_art')
    });
};

exports.scores = function(req, res) {
    return new Promise((res) => {
        // res.writeHead(200, {"Content-Type": "application/json"});
        // res.end(JSON.stringify({"message": "Cos tutaj wpiszemy"}));
        res('scores')
    });
};