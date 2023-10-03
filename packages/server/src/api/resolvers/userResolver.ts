import UserModel from "../models/userModel";

const userReslover = {
  Query: {
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
      _context: any,
      _info: any
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
    createUser: async (_parent: any, args: any, _context: any, _info: any) => {
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
