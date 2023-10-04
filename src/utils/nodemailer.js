const { MAIL_USERNAME, MAIL_PASSWORD } = process.env;
const { User, Product } = require("../db");

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
                text-align: center;
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
                <h1>¡Gracias por registrarte!</h1>
            </div>
            <div class="content">
                <p class="thank-you">¡Hola ${user.name}!</p>
                <p class="message">Gracias por registrarse en nuestro sitio.<br/> 
                Estamos emocionados de tenerte como parte de nuestra comunidad.</p>
                <p class="message">Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
                <p class="message">¡Esperamos que disfrutes de todos los beneficios que tenemos para ofrecerte.!</p>
                <p class="message">Haga clic en el botón a continuación para comenzar a explorar nuestro sitio:</p>
                <a class="cta-button" href="http://localhost:5173/">Visitar Tu Sueño</a>
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

const sendPurchaseEmail = async (user, order) => {
  try {
    const productList = await Promise.all(
      order.products.map(async (product) => {
        const item = await Product.findByPk(product.id);
        if (!item) {
          throw new Error(`Producto no encontrado con el id: ${product.id}`);
        }
        return {
          name: item.name.slice(0, 45),
          price: item.price,
          quantity: product.quantity,
        };
      })
    );
    const formattedDate = new Date().toLocaleDateString();

    function getStatusBasedEmailHtml(user, productList, status) {
      if (status === "succeeded") {
        return `<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>¡Gracias por tu compra en TuSueño!</title>
          <style>
              /* Estilos generales */
              body {
                  font-family: 'Poppins', sans-serif;
                  background-color: #f8f9fa;
                  color: #252525;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  min-height: 100vh;
              }
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 5px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }

              .cta-button {
                display: inline-block;
                align-items: center;
                justify-content: center;
                padding: 10px 20px;
                background-color: #dd6bbb;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
              }
      
              /* Estilos para la tarjeta */
              .card {
                  padding: 20px;
                  background-color: #5dc460;
                  border-radius: 5px;
                  border: 1px solid #e5e5e5;
                  margin-bottom: 20px;
              }
      
              /* Estilos para la lista de productos */
              .product-list {
                  list-style: none;
                  font-size: 1.1em;
                  font-family: 'Poppins', sans-serif;
                  padding: 0;
                  margin: 15px 0;
                  color: #333333;
              }
      
              .product-list li {
                  margin-bottom: 5px;
              }
          </style>
      </head>
      
      <body>
          <div class="container">
              <div class="card">
                  <h1>Gracias por tu compra en TuSueño!</h1>
                  <p>Hola ${user.name}!</p>
                  <p>Gracias por realizar su compra en nuestro sitio. Esperamos que esté emocionado de recibir su pedido.</p>
              </div>
              <div class="card">
                  <h2>Acá están los detalles de la compra:</h2>
                  <ul class="product-list">
                      ${productList
                        .map(
                          (product) =>
                            `<li>Producto: ${
                              product.name
                            }<br>Precio por unidad: ${
                              product.price
                            }<br>Cantidad: ${
                              product.quantity
                            }<br>Precio total:${
                              product.price * product.quantity
                            }</li><hr>`
                        )
                        .join("")}
                  </ul>
                  <h3>Total de la compra: ${order.totalprice}</h3>
                  <p>Fecha de la compra: ${formattedDate}</p>
                  <p>Si tienes alguna pregunta o necesitas ayuda con tu pedido, no dudes en contactarnos.</p>
                  <p>¡Esperamos que disfrutes de tu compra y vuelvas pronto!</p>
                  <p>Haga clic en el botón de abajo para visitar nuestro sitio:</p>
                  <a class="cta-button" href="http://localhost:5173/">Visitar TuSueño</a>
              </div>
              <p class="footer">© 2023 TuSueño. All rights reserved.</p>
          </div>
      </body>
      
      </html>
      `;
      } else {
        return `<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>Continúa tus compras en TuSueño!</title>
          <style>
              /* Estilos generales */
              body {
                  font-family: 'Poppins', sans-serif;
                  background-color: #f8f9fa;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  min-height: 100vh;
              }
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 5px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
      
              /* Estilos para la tarjeta */
              .card {
                  padding: 20px;
                  background-color: #fce9e9;
                  border-radius: 5px;
                  border: 1px solid #e5e5e5;
                  margin-bottom: 20px;
              }
      
              /* Estilos para el botón */
              .cta-button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #dd6bbb;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
                  transition: background-color 0.3s ease;
              }
      
              .cta-button:hover {
                  background-color: #c55fa5;
              }
      
              /* Estilos para el pie de página */
              .footer {
                  text-align: center;
                  font-size: 14px;
                  font-weight: 800;
                  color: #888888;
              }
          </style>
      </head>
      
      <body>
          <div class="container">
              <div class="card">
                  <h1>Continúa tus compras en TuSueño!</h1>
                  <p>¡Hola ${user.name}!</p>
                  <p>Hemos notado que tu pago no fue aprobado, pero no te preocupes. Podrás continuar tu compra en otro momento.</p>
              </div>
              <div class="card">
                  <p>Si tienes algún problema con el pago o necesitas más información, no dudes en contactar con nosotros.</p>
                  <p>¡Esperamos verte pronto en TuSueño!</p>
                  <p>Haga clic en el botón a continuación para visitar nuestro sitio:</p>
                  <a class="cta-button" href="http://localhost:5317">Visita  TuSueño</a>
              </div>
              <p class="footer">© 2023 TuSueño. All rights reserved.</p>
          </div>
      </body>
      
      </html>
      `;
      }
    }

    const mailOptionsCompra = {
      from: MAIL_USERNAME,
      to: user.email,
      subject: "Confirmación de compra",
      html: getStatusBasedEmailHtml(user, productList, order.status),
    };

    transporter.sendMail(mailOptionsCompra, (error, info) => {
      if (error) {
        console.error("Error al enviar el email de compra:", error);
      } else {
        console.log("Email de compra enviado: " + info.response);
      }
    });
  } catch (error) {
    console.error("Error al enviar el email de compra:", error);
  }
};

module.exports = { sendRegistrationEmail, sendPurchaseEmail };
