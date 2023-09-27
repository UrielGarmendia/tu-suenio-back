// const { Router } = require("express");
// const { getAllReview } = require("../controllers/Review/getReview");
// const { createReview } = require("../controllers/Review/createReview");
// const { getReviewById } = require("../controllers/Review/getReviewById");
// const {
//   getReviewByIdProduct,
// } = require("../controllers/Review/getReviewByIdProduct");
// const { deleteReview } = require("../controllers/Review/deleteReview");
// const { modifyReview } = require("../controllers/Review/modifyReview");
// const router = Router();

// router.get("/", async (req, res) => {
//   try {
//     const reviews = await getAllReview();
//     if (!reviews) throw new Error("No se encontraron las reviews");
//     res.status(200).json(reviews);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message });
//   }
// });

// router.post("/create", async (req, res) => {
//   try {
//     const { comment, userId, productId } = req.body;
//     const create = createReview(comment, userId, productId);
//     if (!create) throw new Error("No se pudo crear la review");
//     res.status(200).json(create);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message });
//   }
// });

// router.get("/user/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const review = await getReviewById(id);

//     res.status(200).json(review);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message });
//   }
// });

// router.get("/product/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const review = await getReviewByIdProduct(id);

//     res.status(200).json(review);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message });
//   }
// });

// router.delete("/delete/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     await deleteReview(id);
//     res.status(200).json({ message: "Review borrado con exito" });
//   } catch (error) {
//     res.status(400).json({ message: "Error al borrar la Review" });
//   }
// });

// router.put("/modify/:id", async (req, res) => {
//   const reviewId = req.params.id;
//   const updateReview = req.body;
//   try {
//     const review = await modifyReview(reviewId);
//     if (!review) {
//       return res.status(404).json({ message: "Review not found" });
//     }
//     await review.update(updateReview);
//     res.json(review);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error update Review" });
//   }
// });

// module.exports = router;
