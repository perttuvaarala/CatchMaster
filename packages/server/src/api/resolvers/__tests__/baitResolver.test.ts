import baitModel from '../../models/baitModel';
import baitResolver from '../baitResolver';

describe('baitResolver', () => {
    describe('Query', () => {
        describe('getAllBaits', () => {
            it('should return all baits', async () => {
                const baits = [{ name: 'Bait 1' }, { name: 'Bait 2' }];
                jest.spyOn(baitModel, 'find').mockResolvedValueOnce(baits as any);
                const result = await baitResolver.Query.getAllBaits();
                expect(result).toEqual(baits);
            });

            it('should throw an error if there is an error fetching baits', async () => {
                const error = new Error('Error fetching baits');
                jest.spyOn(baitModel, 'find').mockRejectedValueOnce(error);
                await expect(baitResolver.Query.getAllBaits()).rejects.toThrow(error);
            });
        });

        describe('getBaitsByID', () => {
            it('should return the bait with the given ID', async () => {
                const bait = { name: 'Bait 1' };
                const id = '123';
                jest.spyOn(baitModel, 'findById').mockResolvedValueOnce(bait as any);
                const result = await baitResolver.Query.getBaitsByID(null, { id }, null, null);
                expect(result).toEqual(bait);
                expect(baitModel.findById).toHaveBeenCalledWith(id);
            });

            it('should throw an error if there is an error fetching the bait', async () => {
                const error = new Error('Error fetching bait');
                jest.spyOn(baitModel, 'findById').mockRejectedValueOnce(error);
                await expect(baitResolver.Query.getBaitsByID(null, { id: '123' }, null, null)).rejects.toThrow(error);
            });
        });
    });

    describe('Mutation', () => {
        describe('createBait', () => {
            it('should create a new bait', async () => {
                const bait = { name: 'Bait 1' };
                const args = { name: 'Bait 1' };
                const context = { user: { id: 'dummyId', email: '', username: '', birthdate: '', favouriteFishingStyle: '', baits: [] } };
                jest.spyOn(baitModel, 'create').mockResolvedValueOnce(bait as any);
                const result = await baitResolver.Mutation.createBait(null, args, context, null);
                expect(result).toEqual(bait);
                expect(baitModel.create).toHaveBeenCalledWith(args);
            });

            it('should throw an error if there is no user in the context', async () => {
                const context = { user: undefined };
                await expect(baitResolver.Mutation.createBait(null, {}, context, null)).rejects.toThrow('Log in!');
            });

            it('should throw an error if there is an error creating the bait', async () => {
                const error = new Error('Error creating bait');
                jest.spyOn(baitModel, 'create').mockRejectedValueOnce(error);
                const context = { user: { id: 'dummyId', email: '', username: '', birthdate: '', favouriteFishingStyle: '', baits: [] } };
                await expect(baitResolver.Mutation.createBait(null, { name: 'Bait 1' }, context, null)).rejects.toThrow(error);
            });
        });
    });

});
