import * as Yup from "yup"


const loginValidationSchema = Yup.object({
    login: Yup.string().required(),
    password: Yup.string().required()
});

export { loginValidationSchema }