const express = require("express");
const { getAllUsers, getUserById, deleteUser } = require("../controllers/users.controller");

const router = express.Router();

router.get('/getAll', getAllUsers )
router.get('/getById/:id', getUserById )
router.delete('/deleteUser/:id', deleteUser )

module.exports = router;
