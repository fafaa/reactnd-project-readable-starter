# API Server

To install and start the API server, run the following commands in this directory:

* `npm install`
* `node server` or `npm start`

### API Endpoint

The following endpoints are available:

| Endpoints       | Usage          | Params         |
|-----------------|----------------|----------------|
| `POST /set` | Push article object to mocked db | **params** - object containing: {"images": Number, <br> "links": Number <br>,  "title": String, <br> "tags": Number, <br>  "seotitle": Number, <br> "video": Number, <br>  "video": 1, <br> "context_frame": 10 } <br> **uuid_art** - String, <br> **author** - String, <br>, **title** - String, <br> **month** - String, <br> **time_score** - Number, <br> **engagement** - Number, <br>  **performance** - Number, <br>  **overall** - Number, <br>|
| `POST /set_new` | Push article with mocked updated time_score | params same as in **/set** method |
| `GET /list` | Get stats for all users in given month | **query params** <br> **user**: String, <br> **month**: Number |
| `GET /list_art` |  Get stats per articles in given month | **query params** <br> **user**: String, <br> **month**: Number |
| `GET /scores` | Get total (overall) scores per user per month. | **query params** <br> **user**: String, <br> **month**: Number |
