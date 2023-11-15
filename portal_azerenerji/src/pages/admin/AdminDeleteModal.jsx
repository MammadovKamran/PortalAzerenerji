import React, { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from '@chakra-ui/react';
const AdminDeleteModal = ({ isOpen, onClose, overlay, website }) => {
	const [data, setData] = useState({
		id: '',
		name: '',
		url: '',
		logo: '',
	});
	const cancelRef = React.useRef();

	const handleDelete = (e) => {
		// if (e.target.type === 'text') {
		// 	setData({ ...data, [e.target.name]: e.target.value });
		// }
		// if (e.target.type === 'file') {
		// 	setData({ ...data, [e.target.name]: { name: e.target.files[0].name, size: e.target.files[0].size } });
		// }

		console.log(data);
		onClose();
	};
	useEffect(() => {
		if (website) {
			setData({ id: website.id, name: website.name || '', url: website.url || '', logo: website.logo || '' });
		}
	}, [website]);
	return (
		<>
			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				{overlay}
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Delete Website
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure to delete <b>{`${data.name}`}</b> website? You can't undo this action afterward
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme='red' ml={3} onClick={(e) => handleDelete(e)}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>

			{/* <Modal closeOnOverlayClick={false} isCentered initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size={'xl'}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create your account</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Website name</FormLabel>
							<Input ref={initialRef} name='name' placeholder='Website name' value={data.name} onChange={(e) => handleSave(e)} />
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Website URL</FormLabel>
							<Input placeholder='Website URL' name='url' value={data.url} onChange={(e) => handleSave(e)} />
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Website image</FormLabel>
							<Image boxSize='100px' objectFit='cover' src='https://bit.ly/dan-abramov' />
							<Input mt={4} py='1' type='file' required name='logo' placeholder='Website URL' onChange={(e) => handleSave(e)} />
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={handleSave}>
							Save
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal> */}
		</>
	);
};

export default AdminDeleteModal;
