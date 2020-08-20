const defaultResponse = { data: {} }
module.exports = {
    get: jest.fn(() => Promise.resolve(defaultResponse))
}