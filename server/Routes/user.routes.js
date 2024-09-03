const { Router } = require("express");
const user_controllers = require("../Controllers/user.c");

const ruser = Router();

ruser.post("/login", user_controllers.auth, user_controllers.login);
ruser.post("/register", user_controllers.register);

module.exports = ruser;
