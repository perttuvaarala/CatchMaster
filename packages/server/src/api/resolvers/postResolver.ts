import postModel from "../models/postModel";

const postResolver = {
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
    createPost: async (_parent: any, args: any, _context: any, _info: any) => {
      try {
        const post = await postModel.create(args);
        return post;
      } catch (error) {
        console.error("Error creating post:", error);
        throw error;
      }
    },
  },
};

export default postResolver;
