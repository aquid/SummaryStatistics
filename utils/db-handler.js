const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
var debug = require('debug')('summarystatistics:db');

let mongod = null;

/**
 * Connect to the in-memory database.
 */
module.exports.connect = async () => {
    mongod = await MongoMemoryServer.create();
    const uri = await mongod.getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
        dbName: process.env.DB_NAME
    };
    try {
        await mongoose.connect(uri, mongooseOpts);
        debug('Database connected Succesfully');
    } catch (error) {
        console.error('Error in database connection' + error);
        throw error;
    }

}

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}


/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}