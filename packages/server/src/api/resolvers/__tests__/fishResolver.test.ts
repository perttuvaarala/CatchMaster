import fishModel from "../../models/fishModel";
import fishResolver from "../fishResolver";

describe("Fish Resolver", () => {
	describe("Mutation", () => {
		describe("createFish", () => {
			it("should create a new fish", async () => {
				const fish = { id: "New Fish", name: "Testus fishicus" };
				const args = { name: "New Fish", species: "Testus fishicus" };
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

				jest.spyOn(fishModel, "create").mockResolvedValueOnce(
					fish as any,
				);

				const result = await fishResolver.Mutation.createFish(
					null,
					args,
					context,
					null,
				);

				expect(result).toEqual(fish);
				expect(fishModel.create).toHaveBeenCalledWith(args);
			});

			it("should throw an error if there is no user in the context", async () => {
				const context = {
					user: undefined,
				};

				await expect(
					fishResolver.Mutation.createFish(null, {}, context, null),
				).rejects.toThrow("Log in!");
			});

			it("should throw an error if there is an error creating the fish", async () => {
				const error = new Error("Error creating fish");
				jest.spyOn(fishModel, "create").mockRejectedValueOnce(error);

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
					fishResolver.Mutation.createFish(
						null,
						{ name: "New Fish", species: "Testus fishicus" },
						context,
						null,
					),
				).rejects.toThrow(error);
			});
		});
	});
});
