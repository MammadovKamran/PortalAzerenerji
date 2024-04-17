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

  useEffect(() => {
    if (data.length > 0) {
      fetch("http://10.10.12.45:8080/api/v1/websites")
        .then((res) => res.json())
        .then((data) => setData(data));
      console.log(data);
    }
  }, [data]);

  //

  const sendEditModal = (website) => {
    setSelectedWebsite(website);
    setOverlay(<OverlayOne />);
    onOpenEdit();
  };

  const sendDeleteModal = (e, website) => {
    setSelectedWebsite(website);
    setOverlay(<OverlayOne />);
    onOpenDelete();
    e.preventDefault();
  };

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
                    <AccordionButton
                      _expanded={{
                        bg: "blue.600",
                        color: "white",
                      }}
                      height="16">
                      <Box as="span" flex="1" textAlign="left">
                        {/* <Badge variant='subtle' colorScheme='blue' minW={"250"} textAlign={"center"} p={1}> */}
                        <h1
                          style={{
                            fontSize: "20px",
                          }}>
                          {" "}
                          {item.name}
                        </h1>
                        {/* </Badge> */}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </Flex>

                  <AccordionPanel pb={4}>
                    <Flex justifyContent="space-between" alignItems="center" mr="50">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <h2
                          style={{
                            fontSize: "20px",
                            color: "#2B6CB0",
                          }}>
                          {item.url}
                        </h2>
                      </a>
                      <Image boxSize="100px" objectFit="cover" src={process.env.PUBLIC_URL + item.logo} />
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
                <ButtonGroup pt={3}>
                  <Button colorScheme="blue" mr="3" leftIcon={<EditIcon />} onClick={(e) => sendEditModal(item)}>
                    Edit
                  </Button>
                  <Button type="button" colorScheme="red" leftIcon={<DeleteIcon />} onClick={(e) => sendDeleteModal(e, item)}>
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
