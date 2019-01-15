var db = require('./database.js').db;

console.log('!!!!!!!!!!!!DB', db)
exports.set = function(body) {
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


//przyjmuje miesiac lub obecny miesiac jako default
//lista od najlepszego do najgorszego
//3 kolumny: zaangazowanie (suma punktow bez time score), jak performuje (timescore z paramsow),
// sumaryczny (mnozenie cos tam jedno i drugie)
//z limitem 100
//pod osobnym kluczem moj wynik

exports.listArt = function(month) {
    return new Promise((res) => {
        res(db.getTopEl(month))
    });
};

//najlepsza trojka za seo, performance, cos trzeciego
//ma przyjmowac miesiac
exports.scores = function(req, res) {
    return new Promise((res) => {
        // res.writeHead(200, {"Content-Type": "application/json"});
        // res.end(JSON.stringify({"message": "Cos tutaj wpiszemy"}));
        res('scores')
    });
};