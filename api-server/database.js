class DB {
    constructor(value) {
        this._values = {
            [value.uuid_art]: value
        };
    }

    getEl() {
        return Object.values(this._values);
    }

    setEl(value) {
        this._values[value.uuid_art] = value;
        console.log('new value in db', this._values[value.uuid_art]);
        return value.uuid_art;
    }
}


module.exports = {
    db : new DB(
        {
            "params": {
                "images": 1,
                "links": 6,
                "title": 15,
                "tags": 3,
                "seotitle": 1,
                "video": 7,
                "context_frame": 2
            },
            "uuid_art": "067f1975-0898-5885-af59-2009d50f46f3",
            "title_art": "test artykul",
            "author": "Justyna Paliś",
            "month": 1
        }
    )


}

//GRUPOWAC PO MIESIACU!!!!