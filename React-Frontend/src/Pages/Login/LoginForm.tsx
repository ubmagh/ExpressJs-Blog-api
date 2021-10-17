import React from 'react';
import { Formik, FormikHelpers } from 'formik'
import { Box, Button, ButtonGroup, FormLabel,  InputGroup, Input, InputRightElement} from '@chakra-ui/react'
import { InputControl, SubmitButton } from 'formik-chakra-ui'
import { loginValidationSchema } from './Validators/Validators'

interface Values {
    login: string; // email | username
    password: string;
}



const Submit = (values:Values, { setSubmitting }: FormikHelpers<Values>) => {
    setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
    }, 500);
};

const LoginForm = ()=>{
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <Formik
      initialValues={{ login: '', password:'' }}
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
            <InputControl name="login" label="username or email address" />
          </Box>
          
          <Box m="20px auto">  
            <FormLabel htmlFor="password">password</FormLabel>
            <InputGroup size="md">
              <Input
                id="password"
                pr="4.5rem"
                type={show ? "text" : "password"}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
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

export default LoginForm;