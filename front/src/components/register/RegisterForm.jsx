import {Button} from "@/components/ui/button.jsx"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.jsx"
import {Input} from "@/components/ui/input.jsx"
import {Label} from "@/components/ui/label.jsx"
import {Formik, Field, Form, ErrorMessage} from "formik"
import {Link, useNavigate} from "react-router-dom";
import {PhoneInput} from "@/components/register/PhoneInput.jsx";
import registerSchema from "@/schemas/registerSchema.js";
import {useEffect, useState} from "react";
import {Alert, AlertTitle} from "@/components/ui/alert.jsx";
import {AlertCircle} from "lucide-react";
import {registerUser} from "@/redux/actions/authActions.js";
import {useDispatch, useSelector} from "react-redux";
import {resetAuthState} from "@/redux/slices/authSlice.js";

export default function RegisterForm() {
    const dispatch = useDispatch();
    const {userInfo, success, error} = useSelector(state => state.auth);
    const navigate = useNavigate()

    const handleSubmit = async (values) => {
        const {passwordConfirm, ...dataToSend} = values;

        try {
            await dispatch(registerUser(dataToSend))
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect(() => {
    //     if (success) {
    //         dispatch(resetAuthState());
    //         navigate('/login');
    //     }
    //     if (userInfo)
    //         navigate('/user-profile');
    // }, [navigate, userInfo, success, dispatch]);

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Creéz un nouveau compte</CardTitle>
                <CardDescription>
                    Entrez les informations de votre compte
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        password: "",
                        passwordConfirm: "",
                    }}
                    validationSchema={registerSchema}
                    onSubmit={handleSubmit}
                >
                    {({errors, values, setFieldValue}) => (
                        <Form>
                            <div className="grid gap-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="firstName">Prénom</Label>
                                        <Field
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            as={Input}
                                        />
                                        {errors.firstName &&
                                            <ErrorMessage
                                                name="firstName"
                                                component="div"
                                                className="text-xs text-red-500"
                                            />
                                        }
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="lastName">Nom</Label>
                                        <Field
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            as={Input}
                                        />
                                        {errors.lastName &&
                                            <ErrorMessage
                                                name="lastName"
                                                component="div"
                                                className="text-xs text-red-500"
                                            />
                                        }
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Field
                                            id="email"
                                            name="email"
                                            type="email"
                                            as={Input}
                                        />
                                        {errors.email &&
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-xs text-red-500"
                                            />
                                        }
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="phone">Numéro de téléphone</Label>
                                        <PhoneInput
                                            value={values.phone}
                                            onChange={(value) => setFieldValue("phone", value)} // Met à jour Formik
                                        />
                                        {errors.phone &&
                                            <ErrorMessage
                                                name="phone"
                                                component="div"
                                                className="text-xs text-red-500"
                                            />
                                        }
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Mot de passe</Label>
                                            <a
                                                href="#"
                                                className="ml-auto text-sm underline-offset-4 hover:underline"
                                            >
                                                Mot de passe oublié?
                                            </a>
                                        </div>
                                        <Field
                                            id="password"
                                            name="password"
                                            type="password"
                                            as={Input}
                                        />
                                        {errors.password &&
                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="text-xs text-red-500"
                                            />
                                        }
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Confirmation du mot de passe</Label>
                                        </div>
                                        <Field
                                            id="passwordConfirm"
                                            name="passwordConfirm"
                                            type="password"
                                            as={Input}
                                        />
                                        {errors.passwordConfirm &&
                                            <ErrorMessage
                                                name="passwordConfirm"
                                                component="div"
                                                className="text-xs text-red-500"
                                            />
                                        }
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                    >
                                        Inscription
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Vous avez déjà un compte?{" "}
                                    <Link to="/login" className="underline underline-offset-4">
                                        Connectez-vous
                                    </Link>
                                </div>
                                {error &&
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4"/>
                                        <AlertTitle>{error}</AlertTitle>
                                    </Alert>
                                }
                            </div>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    )
}