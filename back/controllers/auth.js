const UsersModel = require('../models/users');
const {checkPassword} = require("../utils/password");
const {generateToken} = require("../utils/jwt");

const auth = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await UsersModel.findOne({email: email.toLowerCase()})

        if (user && await checkPassword(password, user.passwordHash)) {
            const token = await generateToken(user._doc)
            res.status(200).json({token})
        } else {
            res.status(401).send({error: "Email ou mot de passe incorrect"});
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Erreur lors de l'authentification"});
    }
}

const verifyJwt = async (req, res) => {
    res.status(200).json({message: 'Token valide'});
};

module.exports = {
    auth
}