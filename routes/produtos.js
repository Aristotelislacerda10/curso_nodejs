const express = require('express');
const router = express.Router();

// retorna produtos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'retorna todos os produtos'
    });
});

router.post('/', (req, res, next) => {

    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    };

    res.status(201).send({
        mensagem: 'insere todos os produtos',
        produtoCriado: produto
    })
});

router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto

    if (id === 'especial') {
        res.status(200).send({
            mensagem: 'voce descobriu o id especial',
            id: id
        });
    } else {
        res.status(200).send({
            mensagem: 'vc passou um id',
            id: id
        });
    }
    
});

router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando PATCH na rota de produtos'
    });
});

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando DELETE na rota de produtos'
    });
});



module.exports = router;
