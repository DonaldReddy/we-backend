import { ReviewService } from "../service/review.service.js";

const reviewService = new ReviewService();

export class ReviewController {
	getBookReviews = async (req, res) => {
		try {
			const { bookId } = req.query;
			if (!bookId) {
				return res.status(400).json({ message: "Book ID is required" });
			}

			const reviews = await reviewService.getReviews(bookId);

			res.send(reviews);
		} catch (error) {
			res.status(400).send(error.message || "Internal server error");
		}
	};

	addBookReview = async (req, res) => {
		try {
			const { bookId } = req.query;
			if (!bookId) {
				return res.status(400).json({ message: "Book ID is required" });
			}

			const { comment, rating } = req.body;

			if (!comment || !rating) {
				return res
					.status(400)
					.json({ message: "Comment and rating are required" });
			}

			const userId = req.user.id;

			const review = await reviewService.addReview({
				bookId,
				userId,
				comment,
				rating,
			});

			res.status(201).send(review);
		} catch (error) {
			res.status(400).send(error.message || "Internal server error");
		}
	};

	refineBookReview = async (req, res) => {
		try {
			const { comment } = req.body;
			if (!comment) {
				return res.status(400).json({ message: "Comment is required" });
			}

			const refinedComment = await reviewService.refineReview(comment);
			res.status(200).send(refinedComment);
		} catch (error) {
			res.status(400).send(error.message || "Internal server error");
		}
	};
}
