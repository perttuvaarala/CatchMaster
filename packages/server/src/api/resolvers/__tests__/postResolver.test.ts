import postModel from "../../models/postModel";
import postResolver from "../postResolver";

describe("Post Resolver", () => {
	describe("Mutation", () => {
		describe("createPost", () => {
			it("should create a new post", async () => {
				const post = {
					title: "New Post",
					content: "This is a new post.",
				};
				const args = {
					title: "New Post",
					content: "This is a new post.",
				};
				const context = {
					user: {
						id: "dummyId",
						email: "dummyemail",
						birthdate: "22.02.200",
						username: "dummyuser",
						favouriteFishingStyle: "jigi",
						baits: ["asd"],
					},
				};

				jest.spyOn(postModel, "create").mockResolvedValueOnce(
					post as any,
				);

				const result = await postResolver.Mutation.createPost(
					null,
					args,
					context,
					null,
				);

				expect(result).toEqual(post);
				expect(postModel.create).toHaveBeenCalledWith({
					...args,
					timestamp: expect.any(Date),
				});
			});

			it("should throw an error if there is no user in the context", async () => {
				const context = { user: undefined };

				await expect(
					postResolver.Mutation.createPost(null, {}, context, null),
				).rejects.toThrow("Log in!");
			});

			it("should throw an error if there is an error creating the post", async () => {
				const error = new Error("Error creating post");
				jest.spyOn(postModel, "create").mockRejectedValueOnce(error);
				const context = {
					user: {
						id: "dummyId",
						email: "dummyemail",
						birthdate: "22.02.200",
						username: "dummyuser",
						favouriteFishingStyle: "jigi",
						baits: ["asd"],
					},
				};

				await expect(
					postResolver.Mutation.createPost(
						null,
						{ title: "New Post", content: "This is a new post." },
						context,
						null,
					),
				).rejects.toThrow(error);
			});
		});
	});
});
