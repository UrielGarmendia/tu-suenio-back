const multer = require("multer");
const path = require("path"); // maneja las rutas

module.exports = multer({
  storage: multer.diskStorage({}), // indica donde va a ir el archivo, en este caso vacio ya que lo subimos a cloudinary
  // funcion para controlar los archivos aceptados
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname); // el originalname es el nombre del archivo en la pc del usuario
    //la funcion llama a cb y usando una variable booleana, indica si se acepta o no
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      // se pasa a false para que rechace el archivo
      cb(
        new Error(
          "el formato de la imagen no es soportado, tiene que ser un archivo jpg, jpeg o png"
        ),
        false
      );
      return;
    }
    // si pasa, retorna true para aceptar el archivo
    cb(null, true);
  },
});
