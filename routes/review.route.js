import { Router } from "express";
import { ReviewController } from "../controller/review.controller.js";
import { jwtAuthentication } from "../middleware/jwtAuthentication.js";

const reviewController = new ReviewController();

const reviewRouter = Router();

reviewRouter.use(jwtAuthentication);

reviewRouter.get("/", reviewController.getBookReviews);

reviewRouter.post("/", reviewController.addBookReview);
reviewRouter.post("/refine", reviewController.refineBookReview);

export { reviewRouter };
