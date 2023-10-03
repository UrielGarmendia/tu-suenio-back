const { Router } = require("express");
const getUserById = require("../controllers/Users/getUserById");
const createUser = require("../controllers/Users/createUser");
const userLogin = require("../controllers/Users/userLogin");
const getAllUsers = require("../controllers/Users/getAllUsers");
const deleteUser = require("../controllers/Users/deleteUser");
const restoreUser = require("../controllers/Users/restoreUser");
const destroyUser = require("../controllers/Users/destroyUser");
const { modifyUser } = require("../controllers/Users/userModify");
const fs = require("fs");
const upload = require("../utils/multer");
const { uploadImgProduct } = require("../utils/cloudinary");

const router = Router();

// Traer todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

// Traer por id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

// Crear un usuario (Register)
router.post("/register", async (req, res) => {
  try {
    const newUser = await createUser(req.body || {});

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

// Entrar con usuario ya creado (Login)
router.post("/login", async (req, res) => {
  try {
    const { sub } = req.body;
    const userToLogin = await userLogin(sub);
    res.status(200).json(userToLogin);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

/* Borrado logico */
// Borrar usuario (tiene borrado logico y se es capaz de restaurar)
router.delete("/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id: ", id);
    await deleteUser(id);

    res.status(200).json({ message: "El usuario fue eliminado" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

// Restaurar usuario
router.put("/:id/restore", async (req, res) => {
  try {
    const { id } = req.params;
    await restoreUser(id);

    res.status(200).json({ message: "The user has been restored" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

// Borrado definitivo
router.delete("/:id/destroy", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await destroyUser(id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Modificar usuario
router.put("/:id/modify", upload.single("image"), async (req, res) => {
  const userId = req.params.id;
  const updateUser = req.body;
  try {
    if (req.file) { //en caso de que el usuario borre su imagen y mande una url(la que proporciona auth0)
      const filePath = req.file?.path;
      const result = await uploadImgProduct(filePath);
      updateUser.image = result.secure_url;
    }
    const user = await modifyUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.update(updateUser);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error update User" });
  }
});

module.exports = router;
