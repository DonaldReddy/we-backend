import { AuthService } from "../service/auth.service.js";
import { generateToken } from "../utils/jwt.js";

const authService = new AuthService();

export class AuthController {
	constructor() {}

	signIn = async (req, res) => {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				return res.status(400).send("All fields are required");
			}

			const user = await authService.signIn({ email, password });

			const token = generateToken(user);

			res.cookie("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: 1000 * 60 * 60 * 24,
				sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
			});

			res.status(200).send("Sign in successful");
		} catch (error) {
			res.status(400).json({
				message: error.message || "Internal server error",
			});
		}
	};

	signUp = async (req, res) => {
		try {
			const { name, email, password } = req.body;
			if (!name || !email || !password) {
				return res.status(400).send("All fields are required");
			}
			if (password.length < 6) {
				return res
					.status(400)
					.send("Password must be at least 6 characters long");
			}

			const user = await authService.signUp({ name, email, password });

			if (!user) {
				return res.status(400).send("User already exists");
			}
			const token = generateToken(user);

			res.cookie("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: 1000 * 60 * 60 * 24,
				sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
			});

			res.status(200).send("Sign up successful");
		} catch (error) {
			res.status(400).json({
				message: error.message || "Internal server error",
			});
		}
	};

	signOut = async (req, res) => {
		res.clearCookie("token");

		res.status(200).send("Sign out successful");
	};
}
