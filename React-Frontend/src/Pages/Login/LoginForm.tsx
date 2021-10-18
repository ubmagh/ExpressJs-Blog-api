import React from 'react';
import { Formik, FormikHelpers, Field } from 'formik'
import { Box, Button, ButtonGroup, FormLabel, InputGroup, Input, InputRightElement, useToast} from '@chakra-ui/react'
import { AlertStatus} from '@chakra-ui/alert'
import { InputControl, SubmitButton } from 'formik-chakra-ui'
import { loginValidationSchema } from './Validators/Validators'
import { AuthSubscribe } from "../../Services/authenticationService";


interface Values {
    login: string; // email | username
    password: string;
}



const LoginForm = ()=>{
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const toast = useToast();

  return (
    <AuthSubscribe> 
      { ( authService :any) =>(
        <Formik
          initialValues={{ login: '', password:'' }}
          onSubmit= {(values:Values, { setSubmitting }: FormikHelpers<Values>)=>{
            authService.login( values.login, values.password).then( (strStatus:string)=>{
              let message:string ="", status: AlertStatus="info";
              switch(strStatus){
                default:
                  message="An error occured, try again!"; status= "error";
                break;
                case "success":
                  message="Logged-in !"; status= "success";
                break;
                case "invalidCredentiels":
                  message=" login or password is wrong !"; status= "warning";
                break;
                case "invalideData":
                  message=" invalid login or password !"; status= "warning";
                break;
              }
              toast({
                title: message,
                status: status,
                duration: 10000,
                isClosable: true,
              })
              setSubmitting(false);
            });
          }}
          validationSchema={loginValidationSchema}
        >
          {({ handleSubmit, values, errors, isSubmitting }) => (
            <Box
              p={6}
              m="20px auto"
              as="form"
              w="100%"
              onSubmit={handleSubmit as any}
            >
              <Box m="20px auto">
                <InputControl name="login" label="username or email address" autoCorrect="off" autoSave="off" />
              </Box>
              
              <Box m="20px auto">  
                <FormLabel htmlFor="password">password</FormLabel>
                <InputGroup size="md">
                  <Field
                    as={Input}
                    id="password"
                    pr="4.5rem"
                    name="password"
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
                <SubmitButton isLoading={isSubmitting} disabled={ !!errors.login || !!errors.password || isSubmitting } > Sign-in </SubmitButton>
              </ButtonGroup>
            </Box>
          )}
        </Formik>
      )}
    </AuthSubscribe>
  )
}

export default LoginForm;