import React from 'react';
import { useColorMode, Button, Heading, Container, Box, Tooltip } from "@chakra-ui/react"
import { Flex, chakra } from '@chakra-ui/react';
import { Link } from "react-router-dom"
import { Icon } from "@chakra-ui/react"
import { FaBlogger,FaSignInAlt } from "react-icons/fa"
import { MoonIcon } from  '@chakra-ui/icons'
import userType from '../../Models/userType.interface';
import AuthenticationService from '../../Services/authenticationService';

export default function HeaderNav( { authService }: { authService :AuthenticationService} ){
    const toggleColorMode  = useColorMode().toggleColorMode

    return (
      <Container maxW="100%" mx="0" px="0">
          <Flex w="100%" h="100%" px="6" py="3" align="center" justify="space-between" direction="row" bgColor="teal.600" mx="0" >
              <Flex direction="row" >
                  <Link to="/" title="Home page">
                      <chakra.a display="block" aria-label="Back to homepage">
                          <Heading as="h4" color="white"> 
                            <Icon as={FaBlogger} display="inline-block" boxSize="12" mt="-6px" mr="5px"/>
                              Express Blog
                          </Heading>
                      </chakra.a>
                  </Link>
              </Flex>

              <Flex color="gray.100">
                <Box mr="1" >
                  <Tooltip Label="Change website theme" placement="bottom" hasArrow aria-label="A tooltip">
                    <Button onClick={toggleColorMode} variant="ghost">
                      <MoonIcon boxSize="6" />
                    </Button>
                  </Tooltip>
                </Box>
                <Box>
                  <Tooltip Label="Sign-in" hasArrow placement="bottom" aria-label="A tooltip">
                    <Link to="/login">
                      <Button  variant="ghost">
                        <Icon as={FaSignInAlt} boxSize="6" />
                      </Button>
                    </Link>
                  </Tooltip>
                </Box>
              </Flex>
          </Flex>
      </Container>
    )
}