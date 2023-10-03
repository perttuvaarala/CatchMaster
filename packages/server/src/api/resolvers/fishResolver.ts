import fishModel from "../models/fishModel";

const fishResolver = {
  Query: {
    getAllFish: async () => {
      try {
        const fish = await fishModel.find();
        return fish;
        /**let fishnames: Array<string> = [];
        fish.forEach((fish) => {
          fishnames.push(fish.name);
        });*/
      } catch (error) {
        console.error("Error fetching fish:", error);
        throw error;
      }
    },
    fishByName: async (
      _parent: any,
      name: string,
      _context: any,
      _info: any
    ) => {
      try {
        const fish = await fishModel.findOne({ name: name });
        return fish?._id;
      } catch (error) {
        console.error("Error fetching fish:", error);
        throw error;
      }
    },
  },
  Mutation: {
    createFish: async (_parent: any, args: any, _context: any, _info: any) => {
      try {
        const fish = await fishModel.create(args);
        return fish;
      } catch (error) {
        console.error("Error creating fish:", error);
        throw error;
      }
    },
  },
};

export default fishResolver;
