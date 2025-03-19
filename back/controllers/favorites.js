const FavoriteModel = require('../models/favorites');

const createFavorite = async (req, res) => {
    const { user, property } = req.body;

    try {
        // Vérifier si la propriété est déjà en favori pour cet utilisateur
        const existingFavorite = await FavoriteModel.findOne({ user, property });

        if (existingFavorite) {
            return res.status(400).json({ error: 'Cette propriété est déjà dans vos favoris.' });
        }

        // Ajouter la propriété en favori
        const favorite = await FavoriteModel.create({ user, property });

        res.status(201).json(favorite);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Erreur lors de l\'ajout aux favoris.' });
    }
};

const getFavoriteById = async (req, res) => {
    const { favoriteId } = req.params;

    try {
        const favorite = await FavoriteModel.findById(favoriteId)
            .populate('user', 'name email')  // Récupérer les infos de l'utilisateur
            .populate('property', 'title address'); // Récupérer les infos du bien

        favorite ?
            res.status(200).json(favorite) :
            res.status(404).json({ error: 'Favori non trouvé' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Erreur lors de la récupération du favori.' });
    }
};

const getFavoritesByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const favorites = await FavoriteModel.find({ user: userId })
            .populate('property', 'title address')  // Afficher les détails des propriétés
            .sort({ createdAt: -1 }); // Trier du plus récent au plus ancien

        res.status(200).json(favorites);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Erreur lors de la récupération des favoris.' });
    }
};

const deleteFavorite = async (req, res) => {
    const { favoriteId } = req.params;

    try {
        const favorite = await FavoriteModel.findByIdAndDelete(favoriteId);

        if (!favorite) {
            return res.status(404).json({ error: 'Favori non trouvé' });
        }

        res.status(200).json({ message: 'Favori supprimé avec succès' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Erreur lors de la suppression du favori.' });
    }
};

module.exports = {
    createFavorite,
    getFavoriteById,
    getFavoritesByUser,
    deleteFavorite
};