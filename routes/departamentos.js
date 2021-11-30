const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data +  file.originalname);  
    }
})

const upload = multer({
    storage : storage,
    limits:{
        fileSeze: 1024 * 2014 * 5
    }
})



// retorna departamentos
router.get('/', (req, res, next) => {
    // res.status(200).send({
    //     mensagem: 'retorna todos os departamentos'
    // });
mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({error : error})}   
    conn.query(
        'select * from departamento',
        (error, resultado, fields) => {
            if (error) { return res.status(500).send({error : error})}  
            const response = {
                quantidade: resultado.length,
                departamento: resultado.map(dep =>{
                    return{
                      id: dep.id,
                      descricao_dep: dep.descricao_dep
                    }  
                })
             } 
            return res.status(200).send(response) 
        }
    )
})

});

router.post('/', upload.single('dep_imagem'), (req, res, next) => {
    console.log(req.file);
    const departamento = {
        descricao_dep: req.body.nome
    };

    mysql.getConnection((error, conn) =>{
     if (error) { return res.status(500).send({error : error})}   
     conn.query(
         'insert into departamento (descricao_dep) value (?)',
         [req.body.descricao_dep],
         (error, resultado, field) =>{
           conn.release();  
           if (error) { return res.status(500).send({error : error})} 
           
           res.status(201).send({
            mensagem: 'departamento inserido com sucesso',
            id: resultado.insertId
           })

         })
        
    })

    
});

router.get('/:id_dep', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error : error})}   
        conn.query(
            'select * from departamento where id = ?',
            [req.params.id_dep],
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({error : error})} 
                return res.status(200).send({Response : resultado}) 
            }
        )
    })
    
});

router.patch('/', (req, res, next) => {
   
    mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({error : error})}   
        conn.query(
            'UPDATE departamento SET descricao_dep =  ? WHERE id = ?',
            [req.body.descricao_dep,req.body.id],
           
            (error, resultado, field) =>{
              conn.release();  
              if (error) { return res.status(500).send({error : error})} 
              
              res.status(202).send({
               mensagem: 'departamento alterado com sucesso'
              })
   
            })
           
       })
});

router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({error : error})}   
        conn.query(
            'DELETE FROM departamento WHERE id = ?',
            [req.body.id],
           
            (error, resultado, field) =>{
              conn.release();  
              if (error) { return res.status(500).send({error : error})} 
              
              res.status(202).send({
               mensagem: 'departamento DELETADO com sucesso'
              })
   
            })
           
       })
});



module.exports = router;
