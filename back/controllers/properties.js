const PropertiesModel = require('../models/properties');

const createProperty = async (req, res) => {
    const {
        title,
        description,
        owner,
        pricePerNight,
        guests,
        bedrooms,
        bathrooms,
        propertyType,
    } = req.body;

    const address = JSON.parse(req.body.address);
    const availability = JSON.parse(req.body.availability);

    try {
        if (!title || !description || !owner || !address?.street || !address?.city || !address?.postalCode || !pricePerNight || !guests || !bedrooms || !bathrooms || !propertyType) {
            return res.status(400).json({error: req.body});
        }

        const imageUrls = req.files ? req.files.map((file) => file.path) : [];

        const newProperty = await PropertiesModel.create({
            title,
            description,
            owner,
            address,
            pricePerNight,
            guests,
            bedrooms,
            bathrooms,
            propertyType,
            images: imageUrls,
            availability: availability,
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

const getPropertiesPaginate = async (req, res) => {
    try {
        let {
            page = 1,
            limit = 10,
            propertyType,
            minPrice,
            maxPrice,
            bedrooms,
            bathrooms,
            guests,
            startDate,
            endDate
        } = req.query;

        console.log(new Date(req.query.startDate), new Date(req.query.endDate));

        page = parseInt(page);
        limit = parseInt(limit);

        let filter = {};

        // 🔹 Filtrer par type de logement
        if (propertyType) {
            filter.propertyType = propertyType;
        }

        // // 🔹 Filtrer par plage de prix
        if (minPrice || maxPrice) {
            filter.pricePerNight = {};
            if (minPrice) filter.pricePerNight.$gte = parseInt(minPrice);
            if (maxPrice) filter.pricePerNight.$lte = parseInt(maxPrice);
        }
        //
        // // 🔹 Filtrer par nombre de chambres, salles de bain et personnes
        if (bedrooms) filter.bedrooms = {$gte: parseInt(bedrooms)};
        if (bathrooms) filter.bathrooms = {$gte: parseInt(bathrooms)};
        if (guests) filter.guests = {$gte: parseInt(guests)};
        //
        // // 🔹 Filtrer par disponibilité (dates)
        // if (startDate && endDate) {
        //     filter.availability = {
        //         $elemMatch: {
        //             startDate: {$lte: new Date(endDate)},
        //             endDate: {$gte: new Date(startDate)},
        //         },
        //     };
        // }

        const properties = await PropertiesModel.find(filter)
            .sort({createdAt: -1})
            .skip((page - 1) * limit)
            .limit(limit);

        const totalProperties = await PropertiesModel.countDocuments(filter);
        const totalPages = Math.ceil(totalProperties / limit);

        res.status(200).json({
            properties,
            currentPage: page,
            totalPages,
            totalProperties,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({error: "Erreur lors de la récupération des annonces"});
    }
};

module.exports = {
    createProperty,
    getPropertyById,
    updateProperty,
    deleteProperty,
    getPropertiesPaginate
}