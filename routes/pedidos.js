const express = require('express');
const router = express.Router();

// retorna pedidos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'retorna todos os pedidos'
    });
});

router.post('/', (req, res, next) => {

    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    }
    res.status(201).send({
        mensagem: 'insere todos os pedidos',
        pedido: pedido
    });
});

router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido

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


router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando DELETE na rota de pedido'
    });
});



module.exports = router;
