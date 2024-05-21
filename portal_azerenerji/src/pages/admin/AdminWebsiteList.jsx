/** @format */

import React, { useContext, useEffect, useState } from "react";
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
// import alertify from "alertifyjs";
import AdminEditModal from "./AdminEditModal";
import AdminDeleteModal from "./AdminDeleteModal";
import { LoaderContext } from "../../LoaderContext";
import alertify from "alertifyjs";

const AdminWebsiteList = () => {
  const [data, setData] = useState([]);
  const { reload, setReload } = useContext(LoaderContext);

  const { onOpen: onOpenEdit, isOpen: isOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { onOpen: onOpenDelete, isOpen: isOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const OverlayOne = () => <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />;
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const [selectedWebsite, setSelectedWebsite] = useState({
    name: "",
    url: "",
    image: "",
  });

  const fetchData = () => {
    try {
      fetch("http://10.10.12.45:8081/api/v1/websites")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => setData(data))
        .catch((error) => {
          alertify.error("There was a problem with the fetch operation:", error);
        });
    } catch (error) {
      alertify.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (reload) {
      fetchData();
      setReload(false);
    }
  }, [reload, setReload]);

  const sendEditModal = (website) => {
    setSelectedWebsite(website);
    setOverlay(<OverlayOne />);
    onOpenEdit();
  };

  const sendDeleteModal = (website) => {
    setSelectedWebsite(website);
    setOverlay(<OverlayOne />);
    onOpenDelete();
  };

  return (
    <>
      <Container minWidth="6xl" mt="20" mb="20">
        <ChakraProvider>
          <AdminEditModal
            isOpen={isOpenEdit}
            onClose={onCloseEdit}
            overlay={overlay}
            selectedWebsite={selectedWebsite}
            setSelectedWebsite={setSelectedWebsite}
          />
          <AdminDeleteModal isOpen={isOpenDelete} onClose={onCloseDelete} overlay={overlay} website={selectedWebsite} />
          <Accordion allowMultiple>
            {data && data.length > 0 ? (
              data.map((item) => (
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
                          <h1
                            style={{
                              fontSize: "20px",
                            }}>
                            {item.name}
                          </h1>
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
                        <Image
                          alt={item.name}
                          boxSize="100px"
                          objectFit="contain"
                          src={`https://portalazerenerji.s3.eu-north-1.amazonaws.com/${item.image}`}
                        />
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                  <ButtonGroup pt={3}>
                    <Button colorScheme="blue" mr="3" leftIcon={<EditIcon />} onClick={(e) => sendEditModal(item)}>
                      Edit
                    </Button>
                    <Button type="button" colorScheme="red" leftIcon={<DeleteIcon />} onClick={(e) => sendDeleteModal(item)}>
                      Delete
                    </Button>
                  </ButtonGroup>
                </Flex>
              ))
            ) : (
              <Flex justifyContent="center" alignItems="center" height="50vh">
                <h1>Website not found</h1>
              </Flex>
            )}
          </Accordion>
        </ChakraProvider>
      </Container>
    </>
  );
};

export default AdminWebsiteList;
