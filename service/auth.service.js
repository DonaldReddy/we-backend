import { UserRepository } from "../repository/user.repo.js";
import bcrypt from "bcrypt";

const userRepo = new UserRepository();

export class AuthService {
	constructor() {}

	signIn = async ({ email, password }) => {
		const user = await userRepo.findUserByEmail(email);
		if (!user) {
			throw new Error("User not found");
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			throw new Error("Invalid password");
		}

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
		};
	};

	signUp = async ({ name, email, password }) => {
		const user = await userRepo.findUserByEmail(email);
		if (user) {
			throw new Error("User already exists");
		}

		const hashPassword = await bcrypt.hash(password, 10);

		const newUser = await userRepo.createNewUser({
			name,
			email,
			password: hashPassword,
		});

		if (!newUser) {
			throw new Error("User creation failed");
		}

		return {
			id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			role: newUser.role,
		};
	};
}
