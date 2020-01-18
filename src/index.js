const express = require('express')
const mongoose =  require('mongoose')
const httpServer = express();
const  routes = require('./routes')

mongoose.connect('mongodb+srv://mattheus:1989@clusterdomatheus-qrr1j.azure.mongodb.net/devRadar?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

// middleware é um interceptador, como uma rota dentro da aplicação

httpServer.use(express.json());
httpServer.use(routes);

httpServer.listen(3333);
