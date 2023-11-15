import React from 'react';
import { ChakraProvider, FormControl, FormLabel, Button, Box, Select, Flex } from '@chakra-ui/react';

const AdminDeleteWebsite = () => {
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
							<FormControl id='text' pb='6'>
								<FormLabel>Delete Website Name</FormLabel>
								<Select placeholder='Select website name'>
									<option value='1'>Website Type 1</option>
									<option value='2'>Website Type 2</option>
									<option value='3'>Website Type 3</option>
								</Select>
							</FormControl>

							{/* <FormControl id='text' mt={4}>
								<FormLabel>Delete Website url</FormLabel>
								<Select placeholder='Select website url'>
									<option value='1'>Website Type 1</option>
									<option value='2'>Website Type 2</option>
									<option value='3'>Website Type 3</option>
								</Select>
							</FormControl> */}

							<Button type='submit' colorScheme='blue' mt={4} width='full'>
								Submit
							</Button>
						</form>
					</Box>
				</Flex>
			</ChakraProvider>
		</>
	);
};

export default AdminDeleteWebsite;
