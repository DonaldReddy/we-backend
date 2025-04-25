import { Router } from "express";
import { isAdmin } from "../middleware/roleAuthorization.js";
import { BookController } from "../controller/book.controller.js";

const bookController = new BookController();

const bookRouter = Router();

bookRouter.get("/", bookController.getBooks);
bookRouter.get("/featured", bookController.getFeaturedBooks);
bookRouter.get("/:id", bookController.getBookById);

bookRouter.post("/", isAdmin, bookController.createBook);

export { bookRouter };
