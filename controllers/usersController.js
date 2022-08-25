const users = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const debug = require('debug')('summarystatistics:users:controller');
require('dotenv').config();

/**
 * @description Register function to register a new user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.register = async (req, res) => {
    debug('register API called for users');
    // Our register logic starts here
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            return res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await users.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await users.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: process.env.TTL || "2h",
            }
        );
        // save user token
        user.token = token;
        debug('user registered  successfully');

        // return new user
        return res.status(200).json(user);
    } catch (err) {
        console.error('register API failed');
        console.error(err);
        return res.status(400).send('User registration failed');
    }
    // Our register logic ends here
};

/**
 * @description Login API for users to login using credentials
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.login = async (req, res) => {
    debug('login API called for user');
    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await users.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: process.env.TTL || "2h",
                }
            );

            // save user token
            user.token = token;
            debug('user logged in successfully');
            // user
            return res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.error('Login API failed');
        console.error(err);
        return res.status(400).send('User registration failed');
    }
    // Our register logic ends here
};
