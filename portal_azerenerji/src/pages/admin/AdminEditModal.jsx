/** @format */

import React, { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Image } from "@chakra-ui/react";

const AdminEditModal = ({ isOpen, onClose, overlay, website }) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [data, setData] = useState({
    id: "",
    name: "",
    url: "",
    image: {},
  });

  useEffect(() => {
    if (website) {
      setData({ id: website.id, name: website.name, url: website.url || "", image: website.image || {} });
    }
  }, [website]);

  const handleSave = (e) => {
    if (e.target.type === "text") {
      setData({ ...data, [e.target.name]: e.target.value });
    }
    if (e.target.type === "file") {
      setData({ ...data, [e.target.name]: { name: e.target.files[0].name, size: e.target.files[0].size } });
    }
    console.log(data);
    // onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(`http://10.10.12.45:8080/api/v1/websites/update/${website.id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data, "edited data"));
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isCentered initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size={"xl"}>
        {overlay}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Website name</FormLabel>
              <Input ref={initialRef} name="name" placeholder="Website name" value={data.name} onChange={(e) => handleSave(e)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Website URL</FormLabel>
              <Input placeholder="Website URL" name="url" value={data.url} onChange={(e) => handleSave(e)} />
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
