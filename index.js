import { connectToDatabase } from "./database/dbConnect.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { jwtAuthentication } from "./middleware/jwtAuthentication.js";
import { authRouter } from "./routes/auth.route.js";
import { userRouter } from "./routes/user.route.js";
import { bookRouter } from "./routes/book.route.js";
import { reviewRouter } from "./routes/review.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true,
};

console.log(process.env.NODE_ENV);

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

app.use(jwtAuthentication);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/reviews", reviewRouter);

app.get("/", (req, res) => {
	res.send("Hello World! This is the backend server.");
});

connectToDatabase()
	.then(() => {
		console.log("Database operations can proceed.");
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Error during database operations", error);
	});
