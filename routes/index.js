const express = require('express');
const router = express.Router();
//importar express validator
const {  body } = require('express-validator/check');

//importa el controlador
const proyectosController = require('../controllers/proyectosController');

module.exports = function () {
    //ruta para el home
    router.get('/', proyectosController.proyectosHome);
    /*----------- proyectos -------------*/
    //crear
    router.get('/nuevo-proyecto',proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto',
            body('nombre').not().isEmpty().trim().escape(), // sanitizacion
            proyectosController.nuevoProyecto);
    //listar
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);
    //Editar
    router.get('/proyecto/editar/:id',proyectosController.formularioEditar);
    router.post('/nuevo-proyecto/:id',
            body('nombre').not().isEmpty().trim().escape(), // sanitizacion
            proyectosController.actualizarProyecto);
    //Eliminar
    router.delete('/proyectos/:url',proyectosController.eliminarProyecto);

    return router;
}



