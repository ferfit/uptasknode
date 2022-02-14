const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');//nos permite agregar estilos lineales
const htmlToText = require('html-to-text');// creamos una version de html de nuestro email
const util = require('util');// proporcina acceso a algunas funciones de utilidad
const emailConfig = require('../config/email');

let transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user, // generated ethereal user
      pass: emailConfig.password, // generated ethereal password
    },
});

/* let mailOptions = {
    from: 'UpTask <no-reply@uptask.com>', // sender address
    to: "ferfit16@gmail.com", // list of receivers
    subject: "Reestablecer contraseña", // Subject line
    text: "Hola usuario", // plain text body
    html: "<b>Aca iria el texto del email.</b>", // html body
};
 */

//Generar html
const generarHtml = (archivo,opciones={}) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`,opciones); //dirname no trae la carpeta donde estamos ubicados
    return juice(html);
}

exports.enviar = async (opciones) => {

    const html = generarHtml(opciones.archivo,opciones);
    const text = htmlToText.htmlToText(html);
    
    let info = await transporter.sendMail({
        from: '"UpTask <no-reply@uptask.com>', // sender address
        to: opciones.usuario.email, // list of receivers
        subject: opciones.subject, // Subject line
        text , // plain text body
        html // html body
    });

}


