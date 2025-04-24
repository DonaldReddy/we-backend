import { Router } from "express";
import { ReviewController } from "../controller/review.controller.js";

const reviewController = new ReviewController();

const reviewRouter = Router();

reviewRouter.get("/", reviewController.getBookReviews);

reviewRouter.post("/", reviewController.addBookReview);
reviewRouter.post("/refine", reviewController.refineBookReview);

export { reviewRouter };
