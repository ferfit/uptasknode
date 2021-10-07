const passport = require('passport');

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