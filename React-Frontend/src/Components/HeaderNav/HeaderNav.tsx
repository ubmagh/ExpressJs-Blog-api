import React from 'react';
import { useColorMode, Button, Heading } from "@chakra-ui/react"
import { Flex, chakra } from '@chakra-ui/react';
import { Link } from "react-router-dom"
import { Icon } from "@chakra-ui/react"
import { FaBloggerB } from "react-icons/fa"
import userType from '../../Models/userType.interface';
import AuthenticationService from '../../Services/authenticationService';

export default function HeaderNav( { authService }: { authService :AuthenticationService} ){
    const { colorMode, toggleColorMode } = useColorMode()

    return (
      <header>
        <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
            <Flex align="center" >
                <Link to="/" >
                    <chakra.a display="block" aria-label="Chakra UI, Back to homepage">
                        <Icon as={FaBloggerB} className="d-inline-block align-text-top fa-4x me-1" />
                        <Heading as="h3"> 
                            Express Blog
                        </Heading>
                    </chakra.a>
                </Link>
            </Flex>


        </Flex>

        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </header>
    )
}