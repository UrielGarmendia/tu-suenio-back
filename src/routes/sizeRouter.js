const { Router } = require("express");
const {
  getAllSize,
  getSizeByName,
  createSize,
} = require("../controllers/Size/sizeController");

const router = Router();

router.get("/", async (req, res) => {
    const { name } = req.query;
    try {
      const size = name
        ? await getSizeByName(name)
        : await getAllSize();
      res.status(200).json(size);
    } catch (error) {
      res.status(400).send("error:" + error.message);
    }
  });
  
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const sizeId = await getAllSize();
      const searchId = sizeId.filter((c) => c.id == id);
  
      res.status(200).json(searchId);
    } catch (error) {
      res.status(400).send("error:" + error.message);
    }
  });
  
  router.post("/create", async (req, res) => {
    const { name, price, stock } = req.body;
    try {
      const createDb = await createSize( name, price, stock );
      res.status(200).json(createDb);
    } catch (error) {
      res.status(400).send("error:" + error.message);
    }
  });
  
  module.exports = router;