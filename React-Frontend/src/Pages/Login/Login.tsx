import React from 'react';
import { Helmet } from "react-helmet";
import { Flex, Box, Heading, Divider } from '@chakra-ui/react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Redirect } from 'react-router-dom'
import { AuthSubscribe } from '../../Services/authenticationService';


export default function Login(){

   
        
    return (
        <AuthSubscribe>
            { (authService:any)=>{
                if( authService.islogged() )
                    return <Redirect to="/" />;
                
                return (
                    <>
                        <Helmet>
                            <title>Blog- Authentication</title>
                        </Helmet>
                        <Flex my="10px" w="100%" display={{base:"block", md:"flex"}}>
                            <Box w={{ base:"100%", "md": "49%"}} py="60px" px="10px" display={{ base:"block", md:"flex" }} flexDirection="column"  justifyContent="center" alignItems="center">
                                <Heading as="h3" textAlign="center" mt="20px" fontWeight="medium"> Sign-in </Heading>
                                <LoginForm />
                            </Box>
                            <Divider orientation="vertical" display={{ base: "none", md:"block" }} />
                            <Box py="60px" px="10px" w={{ base:"100%", "md": "49%"}}>
                                <Heading as="h3" textAlign="center" mt="20px" fontWeight="medium"> Sign-up </Heading>
                                <RegisterForm />
                            </Box>
                        </Flex>
                    </>
                )

            }}
        </AuthSubscribe>
    )
}