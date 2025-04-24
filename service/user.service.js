import { UserRepository } from "../repository/user.repo.js";

const userRepo = new UserRepository();

export class UserService {
	constructor() {}

	createUser = async (data) => {
		const { name, email, password } = data;
		const user = await userRepo.createNewUser({ name, email, password });
		return {
			id: user.id,
			name: user.name,
			email: user.email,
		};
	};

	findUserByEmail = async (email) => {
		const user = await userRepo.findUserByEmail(email);
		return {
			id: user.id,
			name: user.name,
			email: user.email,
		};
	};

	findUserById = async (id) => {
		const user = await userRepo.findUserById(id);

		if (!user) {
			throw new Error("User not found");
		}

		return {
			id: user.id,
			name: user.name,
			email: user.email,
		};
	};

	updateUser = async (id, data) => {
		const user = await userRepo.findUserById(id);
		if (!user) {
			throw new Error("User not found");
		}
		const updatedUser = await userRepo.updateUser(id, data);
		if (!updatedUser) {
			throw new Error("Failed to update user");
		}
		return {
			id: updatedUser.id,
			name: updatedUser.name,
			email: updatedUser.email,
		};
	};
}
