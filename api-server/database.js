
class DB {
    constructor(value) {
        this._values = {
            [value.uuid_art]: value
        };
        this._mockedUpdate = [];
    }

    getEl(queryParams) {
        let articlesPerMonth = this.getElementsByProperty('month')[queryParams.month] || [];
        let articlesByAuthor = this.getElementsByProperty('author', Object.values(articlesPerMonth));
        let resp = {};
        let usersSumStats = [];
        for (let user in articlesByAuthor) {
            let userStats = {
                engagement: 0,
                performance: 0,
                overall: 0,
                author: user
            }
            for(let data of articlesByAuthor[user]) {
                userStats.engagement += Object.values(data.params).reduce(((x,y) => x+y), 0);
                userStats.performance += data.time_score;
            }
            userStats.overall = 2 * userStats.engagement + 3 * userStats.performance;
            // let userStats = this.setStats(articlesByAuthor[user]);
            usersSumStats.push(userStats);
            if(user === queryParams.user) {
                resp.me = userStats;
            }
            console.log(usersSumStats);
        }
        if(!resp.me) {
            resp.me = {
                engagement: 0,
                performance: 0,
                overall: 0,
                author: queryParams.user
            }
        }
        return {
            entries: usersSumStats.sort((a, b) => {return b.overall - a.overall}).slice(0,99),
            me: resp.me
        }

    }

    setEl(value) {
        let valueToBeSaved = value;
        valueToBeSaved['time_score'] = value.params.time_score;
        delete valueToBeSaved.params.time_score;
        console.log('value.uuid_art', value.uuid_art);
        this._values[value.uuid_art] = valueToBeSaved;

        console.log('  this._values', this._values)
        return value.uuid_art;
    }

    getTopEl(queryParams) {
        const month = queryParams.month;
        const queryUser = queryParams.user || null;
        let itemsPerMonth = this.getElementsByProperty('month')[month] || [];
        let itemsByAuthor = this.getElementsByProperty('author', Object.values(itemsPerMonth));
        let usersSumStats = [];
        let resp = {
            entries: {
                engagement: [],
                performance: [],
                overall: []
            },
            me: {
                "engagement": 0,
                "performance": 0,
                "overall": 0,
                "author": queryParams.user
            }
        };
        for (let user in itemsByAuthor) {
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
            if(user === queryUser) {
                resp.me = userStats;
            }
        }
        resp.entries.engagement = this.sortFunction(usersSumStats, 'engagement').slice(0,99);
        resp.entries.performance = this.sortFunction(usersSumStats, 'performance').slice(0,99);
        resp.entries.overall = this.sortFunction(usersSumStats, 'overall').slice(0,99);
        return resp;
    }
    setNewEl(value) {
        let valueToBeSaved = value;
        valueToBeSaved['time_score'] = value.params.time_score || 0;
        delete valueToBeSaved.params.time_score;
        this._mockedUpdate.push(value.uuid_art);
        let counter = 0;
        let updateMocks = setInterval(() => {
            console.log('counter', counter, this._mockedUpdate)
            for(let uuid of this._mockedUpdate) {
                let newTimeScore = 0;
                if(this._values[uuid].time_score < 1) {
                    newTimeScore = Math.floor(Math.random() * (130 - 70)) + 70
                } else {
                    newTimeScore = this._values[uuid].time_score + 10;
                }
                this._values[uuid].time_score = newTimeScore;
            }
            console.log('NEW VALUES',  this._values)
            if(counter > 3) {
                this._mockedUpdate.shift();
                clearInterval(updateMocks)
            }
            counter++;
        }, 10000);
        console.log('od kamila', value);
        console.log('do zapisu', valueToBeSaved)
        this._values[value.uuid_art] = valueToBeSaved;
        return value.uuid_art;
    }


    sumArt(queryParams) {
        let itemsPerMonth = this.getElementsByProperty('month')[queryParams.month] || [];
        let resp = {
            entries: []
        };
        for (let item of itemsPerMonth) {
            item.engagement = Object.values(item.params).reduce(((x,y) => x+y), 0);
            item.performance = item.time_score;
            item.overall = 2 * item.engagement + 3 * item.performance
            resp.entries.push(item)
        }

        resp.entries = resp.entries.sort((a, b) => {return b.overall - a.overall}).slice(0,99)
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
    //
    // setStats(dataSource ) {
    //     console.log(dataSource)
    //     //dataSource = articlesByAuthor[user]
    //     let stats = {
    //         engagement: 0,
    //         performance: 0,
    //         overall: 0
    //     }
    //     for(let data of dataSource) {
    //         stats.engagement += Object.values(data.params).reduce(((x,y) => x+y), 0);
    //         stats.performance += data.time_score;
    //     }
    //     stats.overall = 2 * stats.engagement + 3 * stats.performance;
    //     return stats;
    // }

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
            "title": "test artykul",
            "author": "Justyna Paliś",
            "month": 7,
            "time_score": 240
        }
    )


};