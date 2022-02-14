const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');

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

        //Crear una url de confirmar cuenta
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

        //Crear el objeto de usuario
        const usuario = {
            email
        }

        //Enviar email
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirmar cuenta',
            confirmarUrl,
            archivo: 'confirmar-cuenta' // archivo pug
        })    

        //Redirigir
        req.flash('correcto','Te enviamos un correo para confirmar tu cuenta.');
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

exports.confirmarCuenta = async (req,res) => {

    const usuario = await Usuarios.findOne({
        where:{
            email: req.params.correo
        }
    })

    //si no existe
    if(!usuario){
        req.flash('error','No valido');
        res.redirect('/crear-cuenta');
    }

    //Si existe el usuario, cambiamos estado 
    usuario.activo = 1;
    await usuario.save();

    //Redigir
    req.flash('correcto','Cuenta activada correctamente');
    res.redirect('/iniciar-sesion');

}