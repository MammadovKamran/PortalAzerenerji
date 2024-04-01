import React from 'react';
import { ChakraProvider, FormControl, FormLabel, Input, Button, Box, Flex } from '@chakra-ui/react';
const AdminCreateWebsite = () => {
	const handleSubmit = (event) => {
		event.preventDefault();
		// Handle form submission here
	};
	return (
		<>
			<ChakraProvider>
				<Flex minWidth='6xl' height='80vh' alignItems='center' justifyContent='center'>
					<Box maxW='container.sm' m='auto' w='100%' p='4'>
						<form onSubmit={handleSubmit}>
							<FormControl id='text'>
								<FormLabel>Website Name</FormLabel>
								<Input type='text' placeholder='Enter website name' />
							</FormControl>

							<FormControl id='text' mt={4}>
								<FormLabel>Website url</FormLabel>
								<Input type='text' placeholder='Enter website url' />
							</FormControl>

							<FormControl id='file' mt={4}>
								<FormLabel>Upload File</FormLabel>
								<Input type='file' />
							</FormControl>

							<Button type='submit' colorScheme='blue' mt={4} width='full'>
								Create New
							</Button>
						</form>
					</Box>
				</Flex>
			</ChakraProvider>
		</>
	);
};

export default AdminCreateWebsite;
