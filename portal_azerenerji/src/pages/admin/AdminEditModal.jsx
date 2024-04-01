import React, { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Image } from "@chakra-ui/react";

const AdminEditModal = ({ isOpen, onClose, overlay, website }) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [data, setData] = useState({
    id: "",
    name: "",
    url: "",
    logo: "",
  });

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

  const handleSubmit = () => {};
  useEffect(() => {
    if (website) {
      setData({ id: website.id, name: website.name || "", url: website.url || "", logo: website.logo || "" });
    }
  }, [website]);

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
              <Image boxSize="100px" objectFit="cover" src="https://bit.ly/dan-abramov" />
              <Input mt={4} py="1" type="file" required name="logo" placeholder="Website URL" onChange={(e) => handleSave(e)} />
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
