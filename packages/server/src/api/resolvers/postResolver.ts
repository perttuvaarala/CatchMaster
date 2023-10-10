import { TContext } from "../..";
import baitModel from "../models/baitModel";
import fishModel from "../models/fishModel";
import postModel, { Post } from "../models/postModel";
import userModel from "../models/userModel";

const postResolver = {
	Post: {
		bait: async (parent: Post, _args: any, _context: any, _info: any) => {
			return baitModel.findOne({ _id: { $in: parent.baitID } });
		},
		user: async (parent: Post, _args: any, _context: any, _info: any) => {
			return userModel.findOne({ _id: { $in: parent.userID } });
		},
		fish: async (parent: Post, _args: any, _context: any, _info: any) => {
			return fishModel.findOne({ _id: { $in: parent.fishID } });
		},
	},
	Query: {
		getAllPosts: async () => {
			try {
				const posts = await postModel.find();
				return posts;
			} catch (error) {
				console.error("Error fetching posts:", error);
				throw error;
			}
		},
	},
	Mutation: {
		createPost: async (
			_parent: any,
			args: any,
			context: TContext,
			_info: any,
		) => {
			if (!context.user) {
				throw new Error("Log in!");
			}
			try {
				const post = await postModel.create({
					...args,
					timestamp: new Date(),
					weatherCondition: "Sunny",
				});
				return post;
			} catch (error) {
				console.error("Error creating post:", error);
				throw error;
			}
		},
	},
};

export default postResolver;
