var db = require('./database.js').db;

exports.set = function(body) {
    return new Promise((res) => {
        let uuid = db.setEl(body);
        res({uuid_art: uuid});
    });

};
exports.listGet = function(queryParams) {
    return new Promise((res) => {
        res(db.getEl(queryParams))
    });
};

exports.listArt = function(queryParams) {
    return new Promise((res) => {
        res(db.sumArt(queryParams))
    });
};

exports.scores = function(queryParams) {
    return new Promise((res) => {
        res(db.getTopEl(queryParams))
    });
};

exports.setNew = function(body) {
    return new Promise((res) => {
        let uuid = db.setNewEl(body);
        res({uuid_art: uuid});
    });
};