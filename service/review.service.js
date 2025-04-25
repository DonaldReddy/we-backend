import { BookRepository } from "../repository/book.repo.js";
import { ReviewRepository } from "../repository/review.repo.js";

const reviewRepo = new ReviewRepository();
const bookRepo = new BookRepository();

export class ReviewService {
	getReviews = async (bookId) => {
		const reviews = await reviewRepo.getReviews(bookId);
		return reviews;
	};

	addReview = async ({ bookId, userId, comment, rating }) => {
		const book = await bookRepo.getBookById(bookId);
		if (!book) {
			throw new Error("Book not found");
		}

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
