import nodemailer from 'nodemailer';

const enviarEmail = async(email, nombre, token) => {

    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });

    let plantilla = `<p>Hola ${nombre}, haga click en el siguiente enlace y active su cuenta 
    <a href='${process.env.FRONTEND_URL}/comprobar-cuenta/${token}'>click aqui</a></p>`;

    const mailOptions = {
        from: process.env.USER,
        to: email,
        subject: "Active su cuenta",
        html: plantilla,
    };
    
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
}
export default enviarEmail;