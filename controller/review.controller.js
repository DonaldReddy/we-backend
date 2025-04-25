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
			res.status(400).json({
				message: error.message || "Internal server error",
			});
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

			if (rating < 1 || rating > 5) {
				return res.status(400).json({
					message: "Rating must be between 1 and 5",
				});
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
			res.status(400).json({
				message: error.message || "Internal server error",
			});
		}
	};

	refineBookReview = async (req, res) => {
		try {
			const { review } = req.body;
			if (!review) {
				return res.status(400).json({ message: "Review is required" });
			}

			if (review.split(" ").length < 20) {
				return res
					.status(400)
					.json({ message: "Review must be at least 20 words" });
			}

			const refinedComment = await reviewService.refineReview(review);
			res.status(200).send(refinedComment);
		} catch (error) {
			res.status(400).json({
				message: error.message || "Internal server error",
			});
		}
	};
}
