import UserModel from "../../models/userModel";
import userResolver from "../userResolver";

describe("User Resolver", () => {
	describe("Mutation", () => {
		describe("editUser", () => {
			it("should edit a user", async () => {
				const updatedUser = {
					id: "dummyId",
					email: "updated_email@example.com",
					username: "updated_username",
					birthdate: "1990-01-01",
					favouriteFishingStyle: "Fly Fishing",
					baits: ["asd"],
				};
				const args = updatedUser;
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

				jest.spyOn(
					UserModel,
					"findByIdAndUpdate",
				).mockResolvedValueOnce(updatedUser as any);

				const result = await userResolver.Mutation.editUser(
					null,
					args,
					context,
					null,
				);

				expect(result).toEqual(updatedUser);
				expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(
					context.user.id,
					args,
				);
			});

			it("should throw an error if there is no user in the context", async () => {
				const context = { user: undefined };

				await expect(
					userResolver.Mutation.editUser(null, {}, context, null),
				).rejects.toThrow("Log in!");
			});

			it("should throw an error if there is an error updating the user", async () => {
				const error = new Error("Error updating user");
				jest.spyOn(
					UserModel,
					"findByIdAndUpdate",
				).mockRejectedValueOnce(error);

				// Mock the context object with a user
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
					userResolver.Mutation.editUser(
						null,
						{
							id: "dummyId",
							email: "updated_email@example.com",
							username: "updated_username",
							birthdate: "1990-01-01",
							favouriteFishingStyle: "Fly Fishing",
							baits: ["asd"],
						},
						context,
						null,
					),
				).rejects.toThrow(error);
			});

			it("should throw an error if the user is not found", async () => {
				jest.spyOn(
					UserModel,
					"findByIdAndUpdate",
				).mockResolvedValueOnce(null);

				// Mock the context object with a user
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
					userResolver.Mutation.editUser(
						null,
						{ id: "dummyId", email: "updated_email@example.com" },
						context,
						null,
					),
				).rejects.toThrow("Failed to find user");
			});
		});
	});
});
