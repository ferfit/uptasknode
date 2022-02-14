const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt-nodejs');
const enviarEmail = require('../handlers/email');

exports.autenticarUsuario = passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash:true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

//Función para revisar si el usuario esta logeado o no
exports.usuarioAutenticado = (req,res,next) => {
    //si esta
    if(req.isAuthenticated()){
       return next(); 
    }

    //si no

    return res.redirect('/iniciar-sesion');
}

//Cerrar sesion
exports.cerrarSesion = (req,res) => {
    req.session.destroy(()=>{
        res.redirect('/iniciar-sesion');
    })
}

//Genera un token si el usuario es valido
exports.enviarToken = async (req, res) => {

    //Verificar que el usuario exista
    const {email} = req.body;
    const usuario = await Usuarios.findOne({ where:{email} })

    //Si no existe el usuario
    if(!usuario) {
        req.flash('error','No existe esa cuenta'); 
        res.redirect('/reestablecer');
    }

    //Usuario existe
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;

    //guardamos en la base de datos
    await usuario.save();

    //Url de reset
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;


    //Enviar email con el token
    await enviarEmail.enviar({
        usuario,
        subject: 'Reestablecer contraseña',
        resetUrl,
        archivo: 'reestablecer-password' // archivo pug
    })

    //console.log(resetUrl);

    //Redireccion
    req.flash('correcto','Se envió un mensaje a tu correo.');
    res.redirect('/iniciar-sesion');
    
}

exports.validarToken = async (req,res) =>{
    const usuario = await Usuarios.findOne({
        where:{
            token:req.params.token
        }
    })

    //si no encuentra el usuario
    if(!usuario){
        req.flash('error','No valido');
        res.redirect('/reestablecer');
    }

    //Formulario para genera el password
    res.render('resetPassword',{
        nombrePagina: 'Restablecer una nueva contraseña'
    })


}

exports.actualizarPassword = async (req,res) => {


    //Verifica el token valido pero tmb la fecha de expiracion
    const usuario = await Usuarios.findOne({
        where:{
            token: req.params.token,
            expiracion:{
                [Op.gte] : Date.now() // mayor o igual que
            }
        }
    })

    //verificamos si el usuario existe
    if(!usuario){
        req.flash('error','El correo no existe');
        res.redirect('/reestablecer');
    }

    //hashear el nuevo password
    usuario.token = null;
    usuario.expiracion = null;
    usuario.password = bcrypt.hashSync( req.body.password, bcrypt.genSaltSync(10) );

    //guardamos
    await usuario.save();

    req.flash('correcto','Tu contraseña se ha actualizado correctamente.');
    res.redirect('/iniciar-sesion');
 
    
}
