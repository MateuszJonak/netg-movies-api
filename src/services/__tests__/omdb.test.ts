import { deserialize } from 'serializr';
import { fetchJSON } from '../../utilities/fetch';
import { call, getData } from '../omdb';

jest.mock('../../utilities/fetch');
jest.mock('../../entities/MovieOMDb', () => ({
  MovieOMDb: 'MovieOMDbMock',
}));
jest.mock('serializr');

describe('omdb', () => {
  describe('call', () => {
    it('should invoke fetchJSON and resolved', async () => {
      (fetchJSON as jest.Mock).mockResolvedValueOnce('data');
      const response = await call({ key: 'value' });
      expect(response).toBe('data');
      expect(fetchJSON).toBeCalled();
    });

    it('should invoke fetchJSON and rejected', async () => {
      (fetchJSON as jest.Mock).mockRejectedValueOnce('data');
      try {
        await call({ key: 'value' });
      } catch (error) {
        expect(error).toBe('data');
      }
      expect(fetchJSON).toBeCalled();
    });
  });

  describe('getData', () => {
    it('should invoke call and deserialize response', async () => {
      (deserialize as jest.Mock).mockReturnValueOnce('data');

      const result = await getData('test');
      expect(result).toBe('data');
    });
  });
});
