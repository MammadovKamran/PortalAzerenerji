/** @format */

import React, { useContext } from "react";
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
import { LoaderContext } from "../../LoaderContext";
import Cookies from "js-cookie";
import alertify from "alertifyjs";

const AdminEditModal = ({ isOpen, onClose, overlay, selectedWebsite, setSelectedWebsite }) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { setReload } = useContext(LoaderContext);

  const handleSave = (e) => {
    if (e.target.type === "text") {
      setSelectedWebsite({ ...selectedWebsite, [e.target.name]: e.target.value });
    }
    if (e.target.type === "file") {
      setSelectedWebsite({ ...selectedWebsite, [e.target.name]: e.target.files[0].name });
    }
  };

  const handleSubmit = (e) => {
    putData();
    onClose();
    setReload(true);
  };

  const putData = () => {
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${Cookies.get("token")}` },
        body: JSON.stringify(selectedWebsite),
      };
      fetch(`http://10.10.12.45:8081/api/v1/websites/update/${selectedWebsite.id}`, requestOptions)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .catch((error) => {
          alertify.error("There was a problem with the fetch operation:", error);
        });
    } catch (error) {
      alertify.error("There was a problem with the fetch operation:", error);
    }
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
              <Image
                alt={selectedWebsite.name}
                boxSize="100px"
                objectFit="contain"
                src={`https://portalazerenerji.s3.eu-north-1.amazonaws.com/${selectedWebsite.image}`}
              />
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
