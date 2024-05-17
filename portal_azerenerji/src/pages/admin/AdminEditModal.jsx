/** @format */

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Image,
} from "@chakra-ui/react";

const AdminEditModal = ({ isOpen, onClose, overlay, selectedWebsite, setSelectedWebsite, setDataShouldBeFetched }) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  // const [selectedWebsite, setSelectedWebsite] = useState({
  //   name: "",
  //   url: "",
  //   image: "",
  // });

  // useEffect(() => {
  //   if (selectedWebsite) {
  //     setSelectedWebsite({ id: selectedWebsite.id, name: selectedWebsite.name, url: selectedWebsite.url || "", image: selectedWebsite.image || {} });
  //   }
  // }, [selectedWebsite]);

  const handleSave = (e) => {
    setDataShouldBeFetched(false);

    if (e.target.type === "text") {
      setSelectedWebsite({ ...selectedWebsite, [e.target.name]: e.target.value });
    }
    if (e.target.type === "file") {
      setSelectedWebsite({ ...selectedWebsite, [e.target.name]: e.target.files[0].name });
    }
    console.log(selectedWebsite);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify(selectedWebsite),
    };
    fetch(`http://10.10.12.45:8080/api/v1/websites/update/${selectedWebsite.id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data, "edited data"));
    onClose();
    setDataShouldBeFetched(true);
  };

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}>
        {overlay}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Website name</FormLabel>
              <Input ref={initialRef} name="name" placeholder="Website name" value={selectedWebsite.name} onChange={(e) => handleSave(e)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Website URL</FormLabel>
              <Input placeholder="Website URL" name="url" value={selectedWebsite.url} onChange={(e) => handleSave(e)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Website image</FormLabel>
              <Image boxSize="100px" objectFit="cover" />
              <Input mt={4} py="1" type="file" required name="image" placeholder="Website URL" onChange={(e) => handleSave(e)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminEditModal;
