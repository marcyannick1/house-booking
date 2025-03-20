import * as Yup from "yup";

export const createPropertySchema = Yup.object().shape({
    title: Yup.string().min(5, "Titre trop court").required("Titre requis"),
    description: Yup.string().min(10, "Description trop courte").required("Description requise"),
    guests: Yup.number().min(1, "Minimum 1 personnes").required("Nombre de personnes requise"),
    pricePerNight: Yup.number().min(1, "Prix invalide").required("Prix requis"),
    address: Yup.string().required("Localisation requise"),
    type: Yup.string().required("Type de logement requis"),
    bedrooms: Yup.number().min(1, "Minimum 1 chambre").required("Chambre requise"),
    bathrooms: Yup.number().min(1, "Minimum 1 salle de bain").required("Salle de bain requise"),
});