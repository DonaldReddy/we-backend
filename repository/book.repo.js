import prisma from "../database/dbConnect.js";

export class BookRepository {
	getBooks = async (page, limit, search, filter, sortby) => {
		const books = await prisma.book.findMany({
			where: {
				title: { contains: search, mode: "insensitive" },
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
				ratingCount: true,
				featured: true,
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
				ratingCount: true,
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

	getFeaturedBooks = async () => {
		const books = await prisma.book.findMany({
			where: {
				featured: "YES",
			},
			orderBy: {
				createdAt: "desc",
			},
			take: 10,
			select: {
				id: true,
				title: true,
				rating: true,
				author: true,
				coverImage: true,
				description: true,
				createdAt: true,
				ratingCount: true,
			},
		});
		return books;
	};

	createBook = async (data) => {
		const book = await prisma.book.create({
			data,
		});
		return book;
	};

	updateBook = async (id, data) => {
		const book = await prisma.book.update({
			where: { id },
			data,
		});
		return book;
	};

	updateBookRating = async (bookId, rating, prismaTransaction) => {
		let currentPrisma = prismaTransaction || prisma;

		const book = await currentPrisma.book.findUnique({
			where: {
				id: bookId,
			},
		});

		if (!book) {
			throw new Error("Book not found");
		}

		const aggregateRating =
			(book.rating * book.ratingCount + rating) / (book.ratingCount + 1);
		const bookCount = book.ratingCount + 1;
		await currentPrisma.book.update({
			where: {
				id: bookId,
			},
			data: {
				rating: parseFloat(aggregateRating.toFixed(1)),
				ratingCount: bookCount,
			},
		});
	};

	deleteBook = async (id) => {
		const book = await prisma.book.delete({
			where: { id },
		});
		return book;
	};
}
