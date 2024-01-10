import { Flex, Text, Box, HStack } from "@chakra-ui/react";
import NavAuth from "./NabAuth";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
    <Box as="nav"  mt="15px" px={4}>
      
      <Flex justify={"space-between"} align="center">
        <Flex gap={4}>
          <HStack>
            <NavLink to="/">
              <Text fontSize={20} whiteSpace="nowrap" fontWeight={900} >
                RecordPlus
              </Text>
            </NavLink>
          </HStack>

          <HStack>
            <NavLink to="/">
              <Text _hover={{ textDecoration: "underline"}} >
                Home
              </Text>
            </NavLink>
          </HStack>
        </Flex>

        <NavAuth />
      </Flex>
    </Box>
    </>
  )
};

export default NavBar;
