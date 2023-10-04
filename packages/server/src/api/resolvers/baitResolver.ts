import baitModel from "../models/baitModel";

const baitResolver = {
  Query: {
    getAllBaits: async () => {
      try {
        const baits = await baitModel.find();
        return baits;
      } catch (error) {
        console.error("Error fetching all baits:", error);
        throw error;
      }
    },
  },
  Mutation: {
    createBait: async (_parent: any, args: any, _context: any, _info: any) => {
      try {
        const bait = await baitModel.create(args);
        return bait;
      } catch (error) {
        console.error("Error creating bait:", error);
        throw error;
      }
    },
  },
};

export default baitResolver;
