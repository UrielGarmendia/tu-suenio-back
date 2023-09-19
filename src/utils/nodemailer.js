const { MAIL_USERNAME, MAIL_PASSWORD } = process.env;
const { User } = require("../db");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
});

const sendRegistrationEmail = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const optionsRegisterMail = {
      from: MAIL_USERNAME,
      to: user.email, //correo del User
      subject: "Registro aprobado",
      html: `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>¡Thanks for registering!</title>
        <style>
            body {
                font-family: Poppins, sans-serif;
                background-color: #f2f2f2;
                color: #333333;
                font-size: 16px;
                line-height: 1.5;
                margin: 0;
                padding: 0;
                align-items: center;
                justify-content: center;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                border: 1px solid black;
            }
    
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
    
            .content {
                margin-bottom: 30px;
            }
    
            .thank-you {
                font-size: 24px;
                margin-bottom: 10px;
            }
    
            .message {
                font-size: 16px;
                line-height: 1.5;
            }
    
            .cta-button {
              display: inline-block;
              align-items: center;
              justify-content: center;
              padding: 10px 20px;
              background-color: #dd6bbb;
              color: #000000;
              text-decoration: none;
              text-style: none;
              border-radius: 5px;
            }
    
            .footer {
                text-align: center;
                font-size: 14px;
                font-weight: 800;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="header">
                <h1>¡Thanks for registering!</h1>
            </div>
            <div class="content">
                <p class="thank-you">¡Hola ${user.name}!</p>
                <p class="message">Gracias por registrarse en nuestro sitio.<br/> 
                Estamos emocionados de tenerte como parte de nuestra comunidad.</p>
                <p class="message">Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
                <p class="message">¡Esperamos que disfrutes de todos los beneficios que tenemos para ofrecerte.!</p>
                <p class="message">Haga clic en el botón a continuación para comenzar a explorar nuestro sitio:</p>
                <a class="cta-button" href="ruta_del_deploy_front">Visitar Tu Sueño</a>
            </div>
            <div class="footer">
                <p>© 2023 Tu Sueño. Todos los derechos reservados.</p>
            </div>
        </div>
    </body>
    
    </html>`,
    };

    transporter.sendMail(optionsRegisterMail, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Respuesta de la info: ", info.response);
      }
    });
  } catch (error) {
    console.error("Error al enviar el correo: ", error);
  }
};

module.exports = { sendRegistrationEmail };
