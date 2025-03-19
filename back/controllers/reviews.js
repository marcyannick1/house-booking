const ReviewModel = require('../models/reviews');

const createReview = async (req, res) => {
    const { property, user, rating, comment } = req.body;

    try {
        // Vérifier si l'utilisateur a déjà laissé un avis pour cette annonce
        const existingReview = await ReviewModel.findOne({ property, user });

        if (existingReview) {
            return res.status(400).json({ error: 'Vous avez déjà laissé un avis pour cette annonce.' });
        }

        // Création de l'avis
        const review = await ReviewModel.create({ property, user, rating, comment });

        res.status(201).json(review);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Erreur lors de la création de l\'avis.' });
    }
};

const getReviewById = async (req, res) => {
    const { reviewId } = req.params;

    try {
        const review = await ReviewModel.findById(reviewId)
            .populate('user', 'name email')  // Affiche le nom et l'email de l'utilisateur
            .populate('property', 'title'); // Affiche le titre de l'annonce

        review ?
            res.status(200).json(review) :
            res.status(404).json({ error: 'Aucun avis trouvé' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'avis.' });
    }
};

const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    try {
        const review = await ReviewModel.findByIdAndUpdate(
            reviewId,
            { rating, comment },
            { new: true, runValidators: true }
        );

        if (!review) {
            return res.status(404).json({ error: 'Avis non trouvé' });
        }

        res.status(200).json(review);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'avis.' });
    }
};

const deleteReview = async (req, res) => {
    const { reviewId } = req.params;

    try {
        const review = await ReviewModel.findByIdAndDelete(reviewId);

        if (!review) {
            return res.status(404).json({ error: 'Avis non trouvé' });
        }

        res.status(200).json({ message: 'Avis supprimé avec succès' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'avis.' });
    }
};

const getReviewsByProperty = async (req, res) => {
    const { propertyId } = req.params;

    try {
        const reviews = await ReviewModel.find({ property: propertyId })
            .populate('user', 'name email')  // Affiche les détails du user
            .sort({ createdAt: -1 }); // Trier par date de création

        res.status(200).json(reviews);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Erreur lors de la récupération des avis.' });
    }
};

module.exports = {
    createReview,
    getReviewById,
    updateReview,
    deleteReview,
    getReviewsByProperty
};