import prisma from "../database/dbConnect.js";

export class BookRepository {
	getBooks = async (page, limit, search, filter, sortby) => {
		const books = await prisma.book.findMany({
			where: {
				title: { contains: search },
			},
			skip: (page - 1) * limit,
			take: limit,
			select: {
				id: true,
				title: true,
				rating: true,
				author: true,
				coverImage: true,
				description: true,
				createdAt: true,
			},
		});
		return books;
	};

	getBookById = async (id) => {
		const book = await prisma.book.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				title: true,
				rating: true,
				author: true,
				coverImage: true,
				description: true,
				createdAt: true,
			},
		});
		return book;
	};

	getTotalBooks = async (search, filter, sortby) => {
		const totalBooks = await prisma.book.count({
			where: {
				title: { contains: search },
			},
		});
		return totalBooks;
	};

	createBook = async (data) => {
		const book = await prisma.book.create({
			data,
		});
		return book;
	};

	updateBookRating = async (bookId, rating) => {
		const book = await prisma.book.findUnique({
			where: {
				id: bookId,
			},
		});

		const aggregateRating = book.rating
			? (book.rating * book.ratingCount + rating) / (book.ratingCount + 1)
			: rating;
		const bookCount = book.ratingCount ? book.ratingCount + 1 : 1;
		await prisma.book.update({
			where: {
				id: bookId,
			},
			data: {
				rating: parseFloat(aggregateRating.toFixed(1)),
				ratingCount: bookCount,
			},
		});
	};
}
