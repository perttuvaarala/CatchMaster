import { TContext } from "./../../index";
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
		getUserByID: async (
			_parent: any,
			args: any,
			_context: TContext,
			_info: any,
		) => {
			try {
				const user = await UserModel.findById(args.id);
				return user;
			} catch (error) {
				console.error("Error fetching user:", error);
				throw error;
			}
		},
	},
	Mutation: {
		editUser: async (
			_parent: any,
			args: any,
			context: TContext,
			_info: any,
		) => {
			if (!context.user) {
				throw new Error("Log in!");
			}
			try {
				const user = await UserModel.findByIdAndUpdate(
					context.user.id,
					args,
				);
				if (!user) throw new Error("Failed to find user");
				user.id = user?._id;
				return user;
			} catch (error) {
				console.error("Error updating user:", error);
				throw error;
			}
		},
	},
};

export default userReslover;
