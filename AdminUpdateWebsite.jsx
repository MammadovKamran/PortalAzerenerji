import React from 'react';
import { ChakraProvider, FormControl, FormLabel, Button, Box, Select, Flex, Input } from '@chakra-ui/react';
import img from '../../images/AzerenerjiLogo.png';
const AdminUpdateWebsite = () => {
	const handleSubmit = (event) => {
		event.preventDefault();
		// Handle form submission here
	};
	return (
		<>
			<ChakraProvider>
				<Flex minWidth='6xl' height='80vh' alignItems='center' justifyContent='center'>
					<Box maxW='container.sm' m='auto' w='100%' p='4'>
						<h1 className='mb-5'>
							Create Website
						</h1>
						<form onSubmit={handleSubmit}>
							<FormControl id='name'>
								<FormLabel> Website name</FormLabel>
								<Select placeholder='Select website name'>
									<option value='1'>Website Type 1</option>
									<option value='2'>Website Type 2</option>
									<option value='3'>Website Type 3</option>
								</Select>
							</FormControl>

							<FormControl id='newName' mt={4}>
								<FormLabel> New name of the website</FormLabel>
								<Input type='text' placeholder='Enter new name' />
							</FormControl>

							<FormControl id='url' mt={4}>
								<FormLabel>Update website url</FormLabel>
								<Select placeholder='Select website url'>
									<option value='1'>Website Type 1</option>
									<option value='2'>Website Type 2</option>
									<option value='3'>Website Type 3</option>
								</Select>
							</FormControl>

							<FormControl id='newUrl' mt={4}>
								<FormLabel> New url of the website</FormLabel>
								<Input type='text' placeholder='Enter new url' />
							</FormControl>

							<FormControl mt={4}>
								<FormLabel> Website image</FormLabel>
								<img width='100px' height='100px' src={img} alt='' />
							</FormControl>

							<FormControl id='newUrl' mt={4}>
								<FormLabel> New image of the website</FormLabel>
								<Input type='file' placeholder='Enter new file' />
							</FormControl>

							<Button type='submit' colorScheme='blue' mt={6} width='full'>
								Submit
							</Button>
						</form>
					</Box>
				</Flex>
			</ChakraProvider>
		</>
	);
};

export default AdminUpdateWebsite;
