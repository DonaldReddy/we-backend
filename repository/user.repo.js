import prisma from "../database/dbConnect.js";

export class UserRepository {
	constructor() {}

	findUserByEmail = async (email) => {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		return user;
	};

	findUserById = async (id) => {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});
		return user;
	};

	createNewUser = async ({ name, email, password }) => {
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password,
			},
		});
		return user;
	};

	updateUser = async (id, data) => {
		const user = await prisma.user.update({
			where: {
				id,
			},
			data,
		});
		return user;
	};
}
