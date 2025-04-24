import { ReviewRepository } from "../repository/review.repo.js";

const reviewRepo = new ReviewRepository();

export class ReviewService {
	getReviews = async (bookId) => {
		const reviews = await reviewRepo.getReviews(bookId);
		return reviews;
	};

	addReview = async ({ bookId, userId, comment, rating }) => {
		const result = await reviewRepo.addReview({
			bookId,
			userId,
			comment,
			rating,
		});
		return result;
	};

	refineReview = async (comment) => {
		// TODO use gpt to refine the comment
	};
}
