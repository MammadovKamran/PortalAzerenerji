import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChakraProvider, Box, Flex, Heading, Button } from '@chakra-ui/react';
// import { HamburgerIcon } from '@chakra-ui/icons';

const NavBar = () => {
	const location = useLocation().pathname;
	console.log(location);
	return (
		<ChakraProvider>
			<Box bg='blue.600' color='white' py='4' px='16'>
				<Flex alignItems='center' justifyContent='space-between'>
					<Heading size='lg'>
						<Link to='/admin/websites'>Admin Panel</Link>
					</Heading>

					{/* <Box color='blue.600' display={{ base: 'block', md: 'none' }}>
						<Menu className='navActive'>
							<MenuButton as={IconButton} icon={<Icon as={HamburgerIcon} />} variant='outline' />
							<MenuList>
								<MenuGroup title='Menu'>
									<MenuItem tabIndex={location === '/admin/create_new_website' ? 0 : -1}>
										<NavLink to='/admin/create_new_website'>Create Website</NavLink>
									</MenuItem>
									<MenuItem tabIndex={location === '/admin/update_website' ? 0 : -1}>
										<NavLink to='/admin/update_website'>Update Website</NavLink>
									</MenuItem>
									<MenuItem tabIndex={location === '/admin/delete_website' ? 0 : -1}>
										<NavLink to='/admin/delete_website'>Delete Website</NavLink>
									</MenuItem>
								</MenuGroup>
								<MenuItem>Log Out</MenuItem>
							</MenuList>
						</Menu>
					</Box> */}

					<Box display={{ base: 'none', md: 'block' }} w='2xl'>
						<Flex align='center' justify='space-around' fontSize='xl' className='navActive'>
							<NavLink to='/admin/websites' className={({ isActive }) => (isActive ? 'active' : undefined)}>
								Websites list
							</NavLink>
							<NavLink to='/admin/create_new_website' className={({ isActive }) => (isActive ? 'active' : undefined)}>
								Create Website
							</NavLink>
							{/* <NavLink mx={2} to='/admin/update_website' className={({ isActive }) => (isActive ? 'active' : undefined)}>
								Update Website
							</NavLink> */}
							{/* <NavLink mx={2} to='/admin/delete_website' className={({ isActive }) => (isActive ? 'active' : undefined)}>
								Delete Website
							</NavLink> */}
						</Flex>
					</Box>

					<Box display={{ base: 'none', md: 'block' }}>
						<Button colorScheme='white' variant='outline' ml={2}>
							<Link to='/admin'>Log Out</Link>
						</Button>
					</Box>
				</Flex>
			</Box>
		</ChakraProvider>
	);
};

export default NavBar;