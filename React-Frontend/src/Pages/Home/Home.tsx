import React from 'react';
import { Helmet } from "react-helmet";
import { Divider, Flex, Box } from '@chakra-ui/react'

export default function Home(props:any){
    return (
        <>
            <Helmet> 
                <title>Blog- Home page</title>
            </Helmet>
            <Flex>
                <Box>
                    articles
                </Box>
                <Divider orientation="vertical" />
                <Box> 
                    categories
                </Box>
            </Flex>
        </>
    )
}