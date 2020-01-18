const { Router } = require('express');
const routes = Router();
const DevController = require('./controllers/DevController');
const SearchControler = require('./controllers/SearchController');

routes.get('/devs', DevController.index)
routes.post('/users', DevController.store);
routes.get('/search', SearchControler.index);

module.exports = routes;