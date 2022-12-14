const employeeModel = require('../models/employee');
const debug = require('debug')('summarystatistics:employees:controller');

/**
 * @description Find the all the employees in  a list
 * @param {*} req 
 * @param {*} res 
 * @returns Array of employees
 */
exports.find = async (req, res) => {
    debug('find API called for employees');
    try {
        const posts = await employeeModel.find({});
        debug('find API success');
        res.status(200).send(posts);
    } catch (error) {
        console.error('find API failed');
        console.error(error);
        return res.status(400).send('Employee listing failed');
    }
};


/**
 * @description Create the employees. 
 * Accepts both single and multiple data
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.create = async (req, res) => {
    debug('create API called for employees');
    try {
        let data = await employeeModel.create(req.body);
        debug('create API success');
        return res.status(200).send(data);
    } catch (error) {
        console.error('create API failed');
        console.error(error);
        return res.status(400).send(error._message);
    }
};


/**
 * @description Delete the employee by id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.delete = async (req, res) => {
    debug('delete API called for employees');
    try {
        let _id = req.params.empId;
        debug('deleteing empId' + _id);
        if(!_id) {
            return res.status(400).send("Employee id is required");
        }
        let data = await employeeModel.findByIdAndDelete(_id);
        debug('delete API for employee success');
        return res.status(200).send(data);
    } catch (error) {
        console.error('delete API failed');
        console.error(error);
        return res.status(400).send('Employee deletion failed');
    }
};

/**
 * @description - Get statis for a list of employess with min, max and mean values
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getStatistics = async (req, res) => {
    debug('getStatistics API called for employees');
    
    let argumentObject = [];
    let queryObject = {
        $group: {
            _id: null,
            avg: { $avg: '$salary' },
            min: { $min: '$salary' },
            max: { $max: '$salary' }
        }
    };

    if (req.query && req.query.on_contract) {
        argumentObject = [
            { $match: { on_contract: true }},
            queryObject
        ]
    } else {
        argumentObject = [
            queryObject
        ]
    }

    if (req.query && req.query.sub_department) {
        queryObject.$group._id = { department: "$department", sub_department: '$sub_department' }
    } else if (req.query && req.query.department) {
        queryObject.$group._id = '$department';
    }

    try {
        const data = await employeeModel.aggregate(argumentObject);
        debug('getStatistics API success');
        res.status(200).send(data);
    } catch (error) {
        console.error('getStatistics API failed');
        console.error(error);
        return res.status(400).send('getStatistics failed');
    }
};