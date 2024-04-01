/** @format */

import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Image,
  Container,
  Button,
  ModalOverlay,
  useDisclosure,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import AdminEditModal from "./AdminEditModal";
import AdminDeleteModal from "./AdminDeleteModal";

const AdminWebsiteList = () => {
  const [data, setData] = useState([]);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const { onOpen: onOpenEdit, isOpen: isOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { onOpen: onOpenDelete, isOpen: isOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const OverlayOne = () => <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />;
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  const handleEditClick = (website) => {
    setSelectedWebsite(website);
    setOverlay(<OverlayOne />);
    onOpenEdit();
  };

  console.log(data);

  const handleDeleteClick = (website) => {
    setSelectedWebsite(website);
    setOverlay(<OverlayOne />);
    onOpenDelete();

    // onOpen();
    // 		fetch('http://localhost:3000/websites', {
    // 			method: 'DELETE',
    // 			headers: { 'Content-Type': 'application/json' },
    // 			body: JSON.stringify({ id: website.id })
    // 		});
    // 		setData(data.filter((item) => item.id !== website.id));
    // 		onClose();
    // 		console.log(data);
    // 		onClose();
    //
  };

  useEffect(() => {
    fetch("http://localhost:3000/websites")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Container minWidth="6xl" mt="20" mb="20">
        <ChakraProvider>
          <AdminEditModal isOpen={isOpenEdit} onClose={onCloseEdit} overlay={overlay} website={selectedWebsite} />
          <AdminDeleteModal isOpen={isOpenDelete} onClose={onCloseDelete} overlay={overlay} website={selectedWebsite} />
          <Accordion allowMultiple>
            {data.map((item) => (
              <Flex direction={"row"} w={"100%"} key={item.id}>
                <AccordionItem mr={2} w={"90%"}>
                  <Flex alignItems="center" justify={"space-between"}>
                    <AccordionButton _expanded={{ bg: "blue.600", color: "white" }} height="16">
                      <Box as="span" flex="1" textAlign="left">
                        <h1 style={{ fontSize: "20px" }}> {item.name}</h1>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </Flex>

                  <AccordionPanel pb={4}>
                    <Flex justifyContent="space-between" alignItems="center" mr="50">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <h2 style={{ fontSize: "20px", color: "#2B6CB0" }}>{item.url}</h2>
                      </a>
                      <Image boxSize="100px" objectFit="cover" src={process.env.PUBLIC_URL + item.logo} />
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
                <ButtonGroup pt={3}>
                  <Button colorScheme="blue" mr="3" leftIcon={<EditIcon />} onClick={(e) => handleEditClick(item)}>
                    Edit
                  </Button>
                  <Button colorScheme="red" leftIcon={<DeleteIcon />} onClick={(e) => handleDeleteClick(item)}>
                    Delete
                  </Button>
                </ButtonGroup>
              </Flex>
            ))}
          </Accordion>
        </ChakraProvider>
      </Container>
    </>
  );
};

export default AdminWebsiteList;
