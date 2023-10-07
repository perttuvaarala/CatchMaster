import mongoose from "mongoose";
import { config } from "./config";

const mongoConnect = async () => {
	const connection = await mongoose.connect(config.DATABASE_URL);
	console.log("DB connected successfully");
	return connection;
};

export default mongoConnect;
