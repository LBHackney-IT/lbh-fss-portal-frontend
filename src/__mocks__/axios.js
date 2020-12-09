const defaultResponse = { data: {} };
module.exports = {
  post: jest.fn(() => Promise.resolve(defaultResponse)),
  get: jest.fn(() => Promise.resolve(defaultResponse)),
  patch: jest.fn(() => Promise.resolve(defaultResponse)),
};
