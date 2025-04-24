import { connectToDatabase } from "./database/dbConnect.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

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
