import { BookRepository } from "../repository/book.repo.js";

const bookRepo = new BookRepository();

export class BookService {
	getBooks = async ({ page = 1, limit = 10, search, filter, sortby }) => {
		const books = await bookRepo.getBooks(page, limit, search, filter, sortby);
		const totalBooks = await bookRepo.getTotalBooks(search, filter, sortby);
		const totalPages = Math.ceil(totalBooks / limit);
		const previousPage = page > 1 ? page - 1 : null;
		const nextPage = page < totalPages ? page + 1 : null;
		return {
			previousPage,
			nextPage,
			totalPages,
			currentPage: page,
			limit,
			books,
		};
	};

	getBookById = async (id) => {
		const book = await bookRepo.getBookById(id);
		return book;
	};

	getFeaturedBooks = async () => {
		const books = await bookRepo.getFeaturedBooks();
		return {
			books,
		};
	};

	createBook = async ({
		title,
		author,
		coverImage,
		description,
		featured = false,
		genre,
	}) => {
		const book = await bookRepo.createBook({
			title,
			author,
			coverImage,
			description,
			featured,
			genre: genre.split(","),
		});
		return book;
	};
}
