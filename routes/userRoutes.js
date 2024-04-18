const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

module.exports = function (db) {
  router.post("/create-account", userController.createAccount(db));
  router.post("/login", userController.login(db));
  return router;
};
