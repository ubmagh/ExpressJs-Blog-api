import React from 'react';
import { Formik, FormikHelpers } from 'formik'
import { Box, ButtonGroup, FormLabel,  InputGroup, Input } from '@chakra-ui/react'
import { InputControl, SubmitButton } from 'formik-chakra-ui'
import { loginValidationSchema } from './Validators/Validators'

interface Values {
    username :string;
    name :string;
    email :string; // email | username
    password :string;
    repassword : string;
}

const Submit = (values:Values, { setSubmitting }: FormikHelpers<Values>) => {
    setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
    }, 500);
};

export default function RegisterForm(){

    return (
        <Formik
      initialValues={{ name: '', email:'', password: '', repassword: '', username:'' }}
      onSubmit={Submit}
      validationSchema={loginValidationSchema}
    >
      {({ handleSubmit, values, errors }) => (
        <Box
          p={6}
          m="20px auto"
          as="form"
          w="100%"
          onSubmit={handleSubmit as any}
        >

          <Box m="20px auto">
            <InputControl name="name" label="name" />
          </Box>

          <Box m="20px auto">
            <InputControl name="username" label="username" />
          </Box>

          <Box m="20px auto">
            <InputControl name="email" label="username" />
          </Box>
          
          <Box m="20px auto">  
            <FormLabel htmlFor="rpassword">password</FormLabel>
            <InputGroup size="md">
              <Input
                id="rpassword"
                pr="4.5rem"
                type="password"
              />
            </InputGroup>
          </Box>

          <Box m="20px auto">  
            <FormLabel htmlFor="repassword">password</FormLabel>
            <InputGroup size="md">
              <Input
                id="repassword"
                pr="4.5rem"
                type= "password"
              />
            </InputGroup>
          </Box>

          <ButtonGroup display="block" textAlign="center" m="20px auto">
            <SubmitButton> Sign-in </SubmitButton>
          </ButtonGroup>
        </Box>
      )}
    </Formik>
    )

}