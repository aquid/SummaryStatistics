const mongoose = require('mongoose');

/**
 * Employee model schema.
 */
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    salary: { type: Number, required: true },
    currency: { type: String, required: true },
    department: { type: String, required: true},
    sub_department: { type: String, required: true}, 
    on_contract: { type: Boolean, default: false}
});

module.exports = mongoose.model('employee', employeeSchema);