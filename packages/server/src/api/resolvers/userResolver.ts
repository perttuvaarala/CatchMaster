import { TContext } from "../..";
import BaitModel from "../models/baitModel";
import UserModel, { User } from "../models/userModel";

const userReslover = {
	User: {
		baits: async (
			parent: User,
			_args: any,
			_context: TContext,
			_info: any,
		) => {
			return BaitModel.find({ _id: { $in: parent.baits } });
		},
	},
	Query: {
		currentUser: async (
			_parent: any,
			_args: any,
			context: TContext,
			_info: any,
		) => {
			console.log("currentUser", context.user);
			return context.user;
		},
		getAllUsers: async () => {
			try {
				const users = await UserModel.find();
				return users;
			} catch (error) {
				console.error("Error fetching all users:", error);
				throw error;
			}
		},
		getUsersBaitsByid: async (
			_parent: any,
			args: any,
			_context: TContext,
			_info: any,
		) => {
			try {
				const users = await UserModel.findById(args.id);
				return users?.baits;
			} catch (error) {
				console.error("Error fetching all users:", error);
				throw error;
			}
		},
	},
	Mutation: {
		createUser: async (
			_parent: any,
			args: any,
			_context: TContext,
			_info: any,
		) => {
			try {
				const user = await UserModel.create(args);
				return user;
			} catch (error) {
				console.error("Error creating user:", error);
				throw error;
			}
		},
	},
};

export default userReslover;
