const User = require("../models/users.model")


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users).status(200);
    } catch (error) {
        let result = error.message;
        return res.json(result).status(500);
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.json(user).status(200);
    } catch (error) {
        let result = error.message;
        return res.json(result).status(500);
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.json({ message: "User deleted successfully" }).status(200);
    } catch (error) {
        let result = error.message;
        return res.json(result).status(500);
    }
}

module.exports = { getAllUsers, getUserById, deleteUser }