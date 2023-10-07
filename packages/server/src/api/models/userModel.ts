import { Schema, model } from "mongoose";

export interface User {
	id: string;
	email: string;
	username: string;
	birthdate: string;
	favouriteFishingStyle: string;
	baits: string[];
}

const userSchema = new Schema<User>({
	username: {
		type: String,
		required: true,
		minlength: 2,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	birthdate: {
		type: String,
	},
	favouriteFishingStyle: {
		type: String,
	},
	baits: {
		type: [String],
		required: true,
		default: [],
	},
});

export default model<User>("User", userSchema);
