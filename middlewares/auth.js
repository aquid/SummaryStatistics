/**
 * Authentication Moddleware
 * This middleware is used to authenticate requests
 * It checks if the token passed to any API is valid  
 * or not(if authentication is needed)
 */
const jwt = require("jsonwebtoken");
const users = require('../models/users');

const config = process.env;

/**
 * @descripttion - fucntion that verifies if token is present, valid or invalid
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns next()
 */
const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  /**
   * Checkf if token  is present in the request or not
   */
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);

    // Check if the token matches for any existing user or not
    const existingUser = await users.findById(decoded.user_id);
    // if user doesn't exist in the db, send error
    if (!existingUser) {
      return res.status(401).send("Invalid Token");
    }
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;