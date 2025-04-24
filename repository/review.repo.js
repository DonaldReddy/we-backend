import prisma from "../database//dbConnect.js";
import { BookRepository } from "./book.repo.js";

const bookingRepo = new BookRepository();

export class ReviewRepository {
	getReviews = async (bookId) => {
		const reviews = await prisma.review.findMany({
			where: {
				bookId,
			},
			include: {
				user: true,
			},
		});
		return reviews;
	};

	addReview = async ({ bookId, userId, comment, rating }) => {
		const review = await prisma.review.create({
			data: {
				bookId,
				userId,
				comment,
				rating,
			},
        });
        await bookingRepo.updateBookRating(bookId, rating);
		return review;
	};
}
