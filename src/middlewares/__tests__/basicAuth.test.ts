import auth from 'basic-auth';
// @ts-ignore
import { mockEnv } from '../../config';
import basicAuthMiddleware from '../basicAuth';

jest.mock('../../config');
jest.mock('basic-auth');

const BASIC_AUTH_USERNAME = 'BASIC_AUTH_USERNAME';
const BASIC_AUTH_PASSWORD = 'BASIC_AUTH_PASSWORD';

describe('basicAuth', () => {
  let mockReply: { code: jest.Mock };
  let mockCode: { header: jest.Mock };
  let mockHeader: jest.Mock;
  let mockDone: jest.Mock;

  beforeEach(() => {
    mockHeader = jest.fn();
    mockCode = {
      header: mockHeader,
    };
    mockReply = {
      code: jest.fn(() => mockCode),
    };
    mockDone = jest.fn();
    mockEnv({
      BASIC_AUTH_USERNAME,
      BASIC_AUTH_PASSWORD,
    });
  });
  it('should authenticate user and invoke done callback without error', () => {
    (auth as any).mockReturnValueOnce({
      name: BASIC_AUTH_USERNAME,
      pass: BASIC_AUTH_PASSWORD,
    });
    (basicAuthMiddleware as any)('request', mockReply, mockDone);
    expect(auth).toHaveBeenCalledWith('request');
    expect(mockDone).toHaveBeenCalled();
    expect(mockDone.mock.calls[0].length).toBe(0);
  });

  it('should not authenticate user and invoke done callback with error', () => {
    (auth as any).mockReturnValueOnce({
      name: BASIC_AUTH_USERNAME,
      pass: 'error',
    });
    (basicAuthMiddleware as any)('request', mockReply, mockDone);
    expect(mockReply.code).toHaveBeenCalledWith(401);
    expect(mockCode.header).toHaveBeenCalledWith('WWW-Authenticate', 'Basic');
    expect(mockDone).toHaveBeenCalledWith(new Error('Access denied'));
  });
});
