const UsersModel = require('../models/users');
const {hashPassword} = require("../utils/password");

const createUser = async (req, res) => {
    const {name, email, password, phone} = req.body;
    try {
        const user = await UsersModel.create({
            name,
            email: email.toLowerCase(),
            passwordHash: await hashPassword(password),
            phone,
        })

        res.status(201).json(user)
    } catch (e) {
        if (e.errorResponse && e.errorResponse.code === 11000) {
            return res.status(409).json({error: e.errorResponse.keyPattern.email ? 'Email deja utilise' : 'Numero de telephone deja utilise'})
        }
        res.status(500).json(e)
    }
}

const updateUser = async (req, res) => {
    const {userId} = req.params;
    const data = {...req.body};

    if (data.password) {
        data.password = await hashPassword(data.password);
    } else if (data.email) {
        data.email = data.email.toLowerCase();
    }

    try {
        const user = await UsersModel.findByIdAndUpdate(userId, data, {new: true})

        if (!user) {
            return res.status(404).json({error: 'Utilisateur non trouvé'});
        }

        res.status(200).json(user);
    } catch (e) {
        if (e.errorResponse && e.errorResponse.code === 11000) {
            return res.status(409).json({error: e.errorResponse.keyPattern.email ? 'Email deja utilise' : 'Numero de telephone deja utilise'})
        }
        res.status(500).json(e)
    }
};

const deleteUser = async (req, res) => {
    const {userId} = req.params;

    try {
        const user = await UsersModel.findByIdAndDelete(userId)

        res.status(200).json(user)
    } catch (e) {
        console.error(e)
        res.status(500).json({error: "Erreur lors de la suppression de l'utilisateur"})
    }
}

const getUserById = async (req, res) => {
    const {userId} = req.params;

    try {
        const user = await UsersModel.findById(userId)
        user ?
            res.status(200).json(user) :
            res.status(404).json({error: 'Aucun utilisateur trouvé'})
    } catch (e) {
        console.error(e)
        res.status(500).json({error: 'Erreur lors de la recuperation'});
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUserById
}