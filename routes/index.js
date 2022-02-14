const express = require('express');
const router = express.Router();
//importar express validator
const {  body } = require('express-validator/check');

//importa el controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authcontroller');

module.exports = function () {
    //Ruta para el home
    router.get('/', 
        authController.usuarioAutenticado,
        proyectosController.proyectosHome
    );
    /*----------- Proyectos -------------*/
    //Crear
    router.get('/nuevo-proyecto',
        authController.usuarioAutenticado,
        proyectosController.formularioProyecto
        );
    router.post('/nuevo-proyecto',
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(), // sanitizacion
        proyectosController.nuevoProyecto
        );
    //listar
    router.get('/proyectos/:url', 
        authController.usuarioAutenticado,
        proyectosController.proyectoPorUrl);
    //Editar
    router.get('/proyecto/editar/:id',
        authController.usuarioAutenticado,    
        proyectosController.formularioEditar
        );
    router.post('/nuevo-proyecto/:id',
        authController.usuarioAutenticado, 
        body('nombre').not().isEmpty().trim().escape(), // sanitizacion
        proyectosController.actualizarProyecto
        );
    //Eliminar
    router.delete('/proyectos/:url',
        authController.usuarioAutenticado,     
        proyectosController.eliminarProyecto
        );

    /*----------- Tareas -------------*/
    //Crear
    router.post('/proyectos/:url', 
        authController.usuarioAutenticado, 
        tareasController.agregarTarea
        );
    //Actualizar
    router.patch('/tareas/:id', 
        authController.usuarioAutenticado, 
        tareasController.cambiarEstadoTarea
        );
    //Eliminar
    router.delete('/tareas/:id', 
        authController.usuarioAutenticado, 
        tareasController.eliminarTarea
        );

    /*----------- Usuarios -------------*/
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    //Crear
    router.post('/crear-cuenta', usuariosController.crearCuenta);
    router.get('/confirmar/:correo',usuariosController.confirmarCuenta);
    //Iniciar session
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);    
    router.post('/iniciar-sesion', authController.autenticarUsuario);
    //Cerrar sesión
    router.get('/cerrar-sesion', authController.cerrarSesion);
    //Restablecer contraseña
    router.get('/reestablecer',usuariosController.formRestablecerPassword);
    router.post('/reestablecer',authController.enviarToken);
    router.get('/reestablecer/:token',authController.validarToken);
    router.post('/reestablecer/:token',authController.actualizarPassword);
                 
    return router;
}



