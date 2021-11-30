const express = require('express');
const app = express();
const morgan = require('morgan');
const BodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');
const rotaDepartamentos = require('./routes/departamentos');


app.use(morgan('dev'));
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use((req, res, next) => {

    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow-Header',
               'Origin, X-Requrested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});

    }
    next();
})

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);
app.use('/departamentos', rotaDepartamentos);


module.exports = app;



