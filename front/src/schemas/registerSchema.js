import * as Yup from "yup";

const registerSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères")
    .required("Le prénom est requis"),

  lastName: Yup.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères")
    .required("Le nom est requis"),

  email: Yup.string()
    .email("Adresse e-mail invalide")
    .required("L'email est requis"),

  phone: Yup.string()
    // .matches(/^\+?[1-9]\d{1,14}$/, "Numéro de téléphone invalide")
    .required("Le numéro de téléphone est requis"),

  password: Yup.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .matches(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
    .matches(/\d/, "Le mot de passe doit contenir au moins un chiffre")
    .matches(/[@$!%*?&]/, "Le mot de passe doit contenir au moins un caractère spécial (@$!%*?&)")
    .required("Le mot de passe est requis"),

  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Les mots de passe doivent correspondre")
    .required("La confirmation du mot de passe est requise"),
});

export default registerSchema;