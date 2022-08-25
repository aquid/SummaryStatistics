const dbHandler = require('../utils/db-handler');
const userController = require('../controllers/usersController');
const fixtures = require('./fixtures');

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());


/**
* Remove and close the db and server.
*/
afterAll(async () => await dbHandler.closeDatabase());


/**
 * Users test suite.
 */
describe('User ', () => {

    /**
     * Tests that a user is able to register
     */
    it('resgistration can be done successfully', async () => {
        const req = fixtures.mockRequest(
            {},
            fixtures.fakeUserData
        );
        const res = fixtures.mockResponse();
        await userController.register(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            "first_name": "Dummy",
            "last_name": "User",
            "email": "testing@user.com",
        }));
    });

    /**
    * Tests that a user is able to login
    */
    it('is able to login', async () => {
        const req = fixtures.mockRequest(
            {},
            {
                email: fixtures.fakeUserData.email,
                password: fixtures.fakeUserData.password
            }
        );
        const res = fixtures.mockResponse();
        await userController.login(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            "first_name": "Dummy",
            "last_name": "User",
            "email": "testing@user.com",
        }));
    });
});