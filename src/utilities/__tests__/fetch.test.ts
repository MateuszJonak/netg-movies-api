import fetch from 'node-fetch';
import { fetchJSON } from '../fetch';

const fetchMock = fetch as any;
const MOCK_URL = 'http://mock.url/';
const MOCK_RESPONSE = { test: 'value' };
const MOCK_REJECT_MSG = 'error response';
describe('fetchJSON', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should resolve with success response', async () => {
    fetchMock.getOnce(MOCK_URL, MOCK_RESPONSE, { overwriteRoutes: false });

    const response = await fetchJSON(MOCK_URL, {
      method: 'GET',
    });
    expect(response.test).toBe(MOCK_RESPONSE.test);
  });

  it('should reject with string message', () => {
    fetchMock.getOnce(
      MOCK_URL,
      { status: 404, body: MOCK_REJECT_MSG },
      { overwriteRoutes: false },
    );

    return fetchJSON(MOCK_URL, {
      method: 'GET',
    }).catch(error => {
      expect(error).toBe(MOCK_REJECT_MSG);
    });
  });

  it('should reject with json message', () => {
    fetchMock.getOnce(
      MOCK_URL,
      { status: 404, body: { code: 404, message: MOCK_REJECT_MSG } },
      { overwriteRoutes: false },
    );

    return fetchJSON(MOCK_URL, {
      method: 'GET',
    }).catch(error => {
      expect(error).toEqual({ code: 404, message: MOCK_REJECT_MSG });
    });
  });
});
