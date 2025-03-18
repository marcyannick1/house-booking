const PropertiesModel = require('../models/properties');
const UsersModel = require("../models/users");

const createProperty = async (req, res) => {
    const {
        title,
        description,
        owner,
        address,
        pricePerNight,
        surface,
        guests,
        bedrooms,
        bathrooms,
        images,
        availability
    } = req.body;

    try {
        if (!title || !description || !owner || !address?.street || !address?.city || !address?.postalCode || !pricePerNight || !surface || !guests || !bedrooms || !bathrooms) {
            return res.status(400).json({error: 'Tous les champs obligatoires doivent être remplis.'});
        }

        const newProperty = await PropertiesModel.create({
            title,
            description,
            owner,
            address,
            pricePerNight,
            surface,
            guests,
            bedrooms,
            bathrooms,
            images: images || [],
            availability: availability || [],
        });

        res.status(201).json(newProperty);
    } catch (e) {
        console.error(e);
        res.status(500).json({error: 'Erreur serveur', details: e.message});
    }
};

const getPropertyById = async (req, res) => {
    const {propertyId} = req.params;

    try {
        const property = await PropertiesModel.findById(propertyId)
        property ?
            res.status(200).json(property) :
            res.status(404).json({error: 'Aucune annonce trouvée'})
    } catch (e) {
        console.error(e)
        res.status(500).json({error: 'Erreur lors de la recuperation'});
    }
}

const updateProperty = async (req, res) => {
    const {propertyId} = req.params;
    const data = {...req.body};

    try {
        const property = await PropertiesModel.findByIdAndUpdate(propertyId, data, {new: true})

        if (!property) {
            return res.status(404).json({error: 'Annonce non trouvé'});
        }

        res.status(200).json(property);
    } catch (e) {
        res.status(500).json(e)
    }
};

const deleteProperty = async (req, res) => {
    const {propertyId} = req.params;

    try {
        const property = await PropertiesModel.findByIdAndDelete(propertyId)

        res.status(200).json(property)
    } catch (e) {
        console.error(e)
        res.status(500).json({error: "Erreur lors de la suppression"})
    }
}

module.exports = {
    createProperty,
    getPropertyById,
    updateProperty,
    deleteProperty
}