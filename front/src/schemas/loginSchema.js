import * as Yup from "yup";

const loginSchema = Yup.object({
    email: Yup.string().email(" ").required(""),
    password: Yup.string().required(""),
})

export default loginSchema;
