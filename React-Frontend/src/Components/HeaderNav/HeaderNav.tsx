import React from 'react';
import { useColorMode, useColorModeValue, Button, Heading, Container, Box, Tooltip, PopoverTrigger, Popover, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody } from "@chakra-ui/react"
import { Flex } from '@chakra-ui/react';
import { Link } from "react-router-dom"
import { Icon } from "@chakra-ui/react"
import { FaBlogger, FaSignInAlt, FaUser, FaSun } from "react-icons/fa"
import { MoonIcon } from  '@chakra-ui/icons'
import userType from '../../Models/userType.interface';
import AuthenticationService from '../../Services/authenticationService';

const AuthBtn = ({ authService, color }: { authService :AuthenticationService, color:any})=>{
  if( authService.islogged() )
  return (
    <Popover>
      <PopoverTrigger>
        <Button  variant="ghost" color={color}>
          <Icon as={FaUser} boxSize="6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader> Hi { authService.getuser()?.name } ! </PopoverHeader>
        <PopoverBody>
          Settings & logout etc..
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );

  return (
    <Tooltip Label="Sign-in or Create an accout" hasArrow placement="bottom" aria-label="A tooltip">
      <Link to="/login">
        <Button  variant="ghost" color={color}>
          <Icon as={FaSignInAlt} boxSize="6" />
        </Button>
      </Link>
    </Tooltip>
  )
};

export default function HeaderNav( { authService }: { authService :AuthenticationService} ){
    const toggleColorMode  = useColorMode().toggleColorMode;
    const iconsColor =  useColorModeValue( "teal.900", "teal.200") ;
    let ThemeIcon =  useColorModeValue(  <MoonIcon boxSize="6" color={iconsColor}/>, <Icon as={FaSun} boxSize="6" color={iconsColor} /> ) ;
    return (
      <Box display="block" h="60px" >
        <Box bgColor={ useColorModeValue("teal.600", "teal.800")} top="0" left="0" w="100%" position="sticky">
          <Container maxW="container.xl" mx="auto" px="0">
              <Flex w="100%" h="100%" px="0" py="2" align="center" justify="space-between" mx="0" >
                  <Flex direction="row" >
                      <Link to="/" title="Home page">
                        <Heading as="h1" fontSize="lg" color="white"> 
                          <Icon as={FaBlogger} display="inline-block" boxSize="10" mt="-6px" mr="5px"/>
                            Express Blog
                        </Heading>
                      </Link>
                  </Flex>

                  <Flex >
                    <Box mr="1">
                      <Tooltip Label="Change website theme" placement="bottom" hasArrow aria-label="A tooltip">
                        <Button onClick={toggleColorMode} variant="ghost" >
                          { ThemeIcon }
                        </Button>
                      </Tooltip>
                    </Box>
                    <Box>
                      <AuthBtn authService={authService} color={iconsColor} />
                    </Box>
                  </Flex>
              </Flex>
          </Container>
        </Box>
      </Box>
    )
}