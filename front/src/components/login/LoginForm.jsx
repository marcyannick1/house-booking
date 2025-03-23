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
import loginSchema from "@/schemas/loginSchema.js";
import {AlertCircle} from "lucide-react";
import {Alert, AlertTitle} from "@/components/ui/alert.jsx";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "@/redux/actions/authActions.js";
import {useEffect} from "react";

export default function LoginForm() {
    const dispatch = useDispatch();
    const {error, userInfo} = useSelector(state => state.auth);
    const navigate = useNavigate()

    const handleSubmit = async (values) => {
        try {
            await dispatch(loginUser(values))
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // console.log(userInfo);
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo, dispatch]);

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Connexion</CardTitle>
                <CardDescription>
                    Entrez les informations de votre compte
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}
                >
                    {({errors}) => (
                        <Form>
                            <div className="grid gap-6">
                                <div className="grid gap-6">
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
                                                name="paswword"
                                                component="div"
                                                className="text-xs text-red-500"
                                            />
                                        }
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                    >
                                        Connexion
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Vous n'avez pas de compte?{" "}
                                    <Link to="/register" className="underline underline-offset-4">
                                        Inscrivez-vous
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