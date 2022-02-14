const Usuarios = require('../models/Usuarios');

//Iniciar sesion
exports.formIniciarSesion = (req,res) => {
    const { error } = res.locals.mensajes;

    res.render('iniciarSesion',{
        nombrePagina : 'Iniciar sesión en UpTask',
        error
    });
}

exports.formCrearCuenta = (req,res) => {
    res.render('crearCuenta',{
        nombrePagina : 'Crear cuenta en UpTask'
    });
}



//Crear
exports.crearCuenta =async (req,res) => {
    //Capturar los campos
    const {email, password} = req.body;

    //Crear usuario
    try {
        await 
        Usuarios.create({
            email,
            password
        });
        res.redirect('/iniciar-sesion');

    } catch (error) {
        req.flash('error',error.errors.map(error => error.message)); //map agrupa los errores
        res.render('crearCuenta',{
            mensajes: req.flash(),
            nombrePagina : 'Crear cuenta en UpTask',
            email,
            password
        })
    }

    
}

exports.formRestablecerPassword = (req,res)=>{
    res.render('reestablecer',{
        nombrePagina : 'Reestablecer tu contraseña'
    })
}