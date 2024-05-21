/** @format */

import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChakraProvider, Box, Flex, Heading, Button, Avatar, Menu, MenuButton, MenuList, MenuGroup, MenuItem } from "@chakra-ui/react";
// import { HamburgerIcon } from '@chakra-ui/icons';
import Cookies from "js-cookie";

const NavBar = () => {
  const location = useLocation().pathname;
  console.log(location);
  return (
    <ChakraProvider>
      <Box bg="blue.600" color="white" py="4" px="16">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading size="lg">
            <Link to="/admin/websites">Admin Panel</Link>
          </Heading>

          <Box display={{ base: "none", md: "block" }} w="2xl">
            <Flex align="center" justify="space-around" fontSize="xl" className="navActive">
              <NavLink to="/admin/websites" className={({ isActive }) => (isActive ? "active" : undefined)}>
                Websites list
              </NavLink>
              <NavLink to="/admin/create_new_website" className={({ isActive }) => (isActive ? "active" : undefined)}>
                Create Website
              </NavLink>
            </Flex>
          </Box>

          <Box display={{ base: "none", md: "block" }} fontSize="xl">
            {/* <Menu>
              <MenuButton variant="unstyled" as={Button} rightIcon={<Avatar src="https://bit.ly/broken-link" />} />
              <MenuList>
                <MenuGroup color="teal" title="Profile">
                  <MenuItem color="teal">My Profile</MenuItem> 
                  <Link to="/admin">
                    <MenuItem color="teal" onClick={(e) => localStorage.clear()}>
                      Log Out
                    </MenuItem>
                  </Link>
                </MenuGroup>
              </MenuList>
            </Menu> */}
            <NavLink to="/admin" onClick={(e) => Cookies.remove("token")}>
              Log Out
            </NavLink>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default NavBar;
