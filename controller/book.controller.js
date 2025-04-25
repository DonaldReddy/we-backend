import { BookService } from "../service/book.service.js";

const bookService = new BookService();

export class BookController {
	getBooks = async (req, res) => {
		try {
			const { page = 1, limit = 10, search, filter, sortby } = req.query;
			const books = await bookService.getBooks({
				page,
				limit,
				search,
				filter,
				sortby,
			});
			return res.send(books);
		} catch (error) {
			res.status(400).json({
				message: error.message || "Internal server error",
			});
		}
	};

	getBookById = async (req, res) => {
		try {
			const { id } = req.params;
			const book = await bookService.getBookById(id);
			if (!book) {
				return res.status(404).send("Book not found");
			}
			return res.send(book);
		} catch (error) {
			res.status(400).json({
				message: error.message || "Internal server error",
			});
		}
	};

	createBook = async (req, res) => {
		try {
			const { title, author, coverImage, description } = req.body;

			if (!title || !author || !coverImage || !description) {
				return res.status(400).send("All fields are required");
			}

			const book = await bookService.createBook({
				title,
				author,
				coverImage,
				description,
			});

			return res.status(201).send(book);
		} catch (error) {
			res.status(400).json({
				message: error.message || "Internal server error",
			});
		}
	};
}
