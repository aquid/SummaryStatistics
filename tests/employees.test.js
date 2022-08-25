const dbHandler = require('../utils/db-handler');
const employeeModel = require('../models/employee');
const employeeController = require('../controllers/employeesController');
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
 * Employee test suite.
 */
describe('Employee ', () => {

    /**
     * Tests that a employee can be added 
     */
    it('can be added', async () => {
        const req = fixtures.mockRequest(
            {},
            fixtures.fakeEmployeeData
        );
        const res = fixtures.mockResponse();
        await employeeController.create(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
            name: expect.any(String),
            salary: expect.any(Number)
        }));
    });

    /**
     * Tests to find employees
     */
    it('can be added', async () => {
        const req = fixtures.mockRequest(
            {},
            {}
        );
        const res = fixtures.mockResponse();
        await employeeController.find(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({
                name: expect.any(String),
                salary: expect.any(Number)
            }),
        ]));
    });

    /**
    * Tests to check if employees can be  deleted
    */
    it('can be added', async () => {
        let user = await employeeModel.findOne({});
        const req = fixtures.mockRequest(
            {},
            {},
            { empId: user._id.toString() }
        );
        const res = fixtures.mockResponse();
        await employeeController.delete(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

/**
 * Employee Statistics test suite.
 */
describe('Statistics ', () => {

    /**
     * Tests that a employee can be added 
     */
    it('can be added', async () => {
        const req = fixtures.mockRequest(
            {},
            fixtures.fakeEmployeeList
        );
        const res = fixtures.mockResponse();
        await employeeController.create(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({
                name: expect.any(String),
                salary: expect.any(Number)
            }),
        ]));
    });

    /**
     * Tests employee statistics for min max and mean 
     */
    it('for all employees', async () => {
        const req = fixtures.mockRequest(
            {}, {}, {}, {}
        );
        const res = fixtures.mockResponse();
        await employeeController.getStatistics(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({ "_id": null, "avg": 22295010, "max": 200000000, "min": 30 }),
        ]));
    });

    /**
     * Tests employee statistics for min max and mean 
     */
    it('for all employees on contract', async () => {
        const req = fixtures.mockRequest(
            {}, {}, {}, { on_contract: true }
        );
        const res = fixtures.mockResponse();
        await employeeController.getStatistics(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({ "_id": null, "avg": 100000, "max": 110000, "min": 90000 }),
        ]));
    });

    /**
     * Tests employee statistics for min max and mean 
     */
    it('for all employees group by category', async () => {
        const req = fixtures.mockRequest(
            {}, {}, {}, { department: true }
        );
        const res = fixtures.mockResponse();
        await employeeController.getStatistics(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(expect.arrayContaining([
            { "_id": "Banking", "avg": 90000, "max": 90000, "min": 90000 },
            { "_id": "Engineering", "avg": 40099006, "max": 200000000, "min": 30 },
            { "_id": "Operations", "avg": 35015, "max": 70000, "min": 30 },
            { "_id": "Administration", "avg": 30, "max": 30, "min": 30 }
        ])
        );
    });

    /**
     * Tests employee statistics for min max and mean 
     */
    it('for all employees group by sub-category', async () => {
        const req = fixtures.mockRequest(
            {}, {}, {}, { sub_department: true }
        );
        const res = fixtures.mockResponse();
        await employeeController.getStatistics(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(expect.arrayContaining([
            {"_id": {"department": "Engineering", "sub_department": "Platform"}, "avg": 40099006, "max": 200000000, "min": 30}, 
            {"_id": {"department": "Operations", "sub_department": "CustomerOnboarding"}, "avg": 35015, "max": 70000, "min": 30}, 
            {"_id": {"department": "Administration", "sub_department": "Agriculture"}, "avg": 30, "max": 30, "min": 30}, 
            {"_id": {"department": "Banking", "sub_department": "Loan"}, "avg": 90000, "max": 90000, "min": 90000}
        ]));
    });
});