const { Router } = require("express");
const { getAdmins } = require("../controllers/Admin/getAdmins");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const admins = await getAdmins();
    res.status(200).json(admins);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
