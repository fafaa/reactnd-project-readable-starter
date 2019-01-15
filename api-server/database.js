class DB {
    constructor(value) {
        console.log('value', value.params)
        this._values = {
            [value.uuid_art]: value
        };
    }

    getEl() {
        return this.getElementsByProperty('month');
    }

    setEl(value) {
        let valueToBeSaved = value;
        console.log('valueToBeSaved')
        valueToBeSaved['time_score'] = value.params.time_score;
        delete valueToBeSaved.params.time_score;
        this._values[value.uuid_art] = valueToBeSaved;
        console.log('new value in db', this._values[value.uuid_art]);
        return value.uuid_art;
    }

//przyjmuje miesiac lub obecny miesiac jako default
//lista od najlepszego do najgorszego
//3 kolumny: zaangazowanie (suma punktow bez time score), jak performuje (timescore z paramsow),
// sumaryczny (mnozenie cos tam jedno i drugie)
//z limitem 100
//pod osobnym kluczem moj wynik

    getTopEl(month) {
        let itemsPerMonth = this.getElementsByProperty('month')[month] || [];
        let itemsByAuthor = this.getElementsByProperty('author', Object.values(itemsPerMonth));
        console.log('xxxxxxxxxxxxxxxx', itemsByAuthor)
        let usersSumStats = [];
        let resp = {
            engagement: [],
            performance: [],
            overall: []
        };
        for (let user in itemsByAuthor) {
            let userData = itemsByAuthor[user];
            console.log('userData', userData)
            let userStats = {
                engagement: 0,
                performance: 0,
                overall: 0,
                author: user
            }
            for(let data of itemsByAuthor[user]) {
                userStats.engagement += Object.values(data.params).reduce(((x,y) => x+y), 0);
                userStats.performance += data.time_score;
            }
            userStats.overall = 2 * userStats.engagement + 3 * userStats.performance;
            usersSumStats.push(userStats);
        }
        resp.engagement = this.sortFunction(usersSumStats, 'engagement');
        resp.performance = this.sortFunction(usersSumStats, 'performance');
        resp.overall = this.sortFunction(usersSumStats, 'overall');
        return resp;
    }
    getElementsByProperty(property, values) {
        values = values? values : Object.values(this._values);
        let resp = {};
        for (let item of values) {
            if(!resp[item[property]]) {
                resp[item[property]] = [item];
            } else {
                resp[item[property]].push(item)
            }
        }
        return resp;
    }

    sortFunction(values, property) {
        return values.sort((a, b) => {return b[property] - a[property]})
            .map(i => ({ score: i[property], author: i.author}))
    }
}


module.exports = {
    db : new DB(
        {
            "params": {
                images: 1,
                links: 6,
                title: 15,
                tags: 3,
                seotitle: 1,
                video: 7,
                context_frame: 2
            },
            "uuid_art": "067f1975-0898-5885-af59-2009d50f46f3",
            "title_art": "test artykul",
            "author": "Justyna Paliś",
            "month": 7,
            "time_score": 240
        }
    )


}

//GRUPOWAC PO MIESIACU!!!!