const express = require('express');
const router = express.Router();
//importar express validator
const {  body } = require('express-validator/check');

//importa el controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');

module.exports = function () {
    //Ruta para el home
    router.get('/', proyectosController.proyectosHome);
    /*----------- Proyectos -------------*/
    //Crear
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

    /*----------- Tareas -------------*/
    //Crear
    router.post('/proyectos/:url', tareasController.agregarTarea);
    //Actualizar
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);
    //Eliminar
    router.delete('/tareas/:id', tareasController.eliminarTarea);

    /*----------- Usuarios -------------*/
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    //Crear
    router.post('/crear-cuenta', usuariosController.crearCuenta);

    return router;
}



