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
			orderBy: {
				createdAt: "desc",
			},
		});
		return reviews;
	};

	addReview = async ({ bookId, userId, comment, rating }) => {
		return await prisma.$transaction(async (prisma) => {
			const review = await prisma.review.create({
				data: {
					bookId,
					userId,
					comment,
					rating,
				},
			});
			await bookingRepo.updateBookRating(bookId, rating, prisma);
			return review;
		});
	};
}
