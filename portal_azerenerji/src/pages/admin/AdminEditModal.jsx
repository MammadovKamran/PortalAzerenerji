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
} from "@chakra-ui/react";
import { LoaderContext } from "../../LoaderContext";
import Cookies from "js-cookie";
import alertify from "alertifyjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminEditModal = ({ isOpen, onClose, overlay, selectedWebsite, setSelectedWebsite }) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { setReload } = useContext(LoaderContext);

  const handleSave = (e) => {
    const { name, value } = e.target;

    if (name === "lib") {
      setSelectedWebsite((prev) => ({
        ...prev,
        image: {
          ...prev.image,
          lib: value,
        },
      }));
    } else if (name === "icon") {
      setSelectedWebsite((prev) => ({
        ...prev,
        image: {
          ...prev.image,
          icon: value,
        },
      }));
    } else {
      setSelectedWebsite((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    putData();
    onClose();
  };

  const putData = () => {
    try {
      const updatedWebsite = {
        ...selectedWebsite,
        image: `${selectedWebsite.image.lib} ${selectedWebsite.image.icon}`, // Combine lib and icon
      };
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${Cookies.get("token")}` },
        body: JSON.stringify(updatedWebsite),
      };

      fetch(`http://10.10.12.45:8081/api/v1/websites/update/${selectedWebsite.id}`, requestOptions)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          setReload(true);
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
    <Modal closeOnOverlayClick={false} isCentered initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size={"xl"}>
      {overlay}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Website</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Website Name</FormLabel>
            <Input ref={initialRef} name="name" placeholder="Website name" value={selectedWebsite.name} onChange={handleSave} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Website URL</FormLabel>
            <Input name="url" placeholder="Website URL" value={selectedWebsite.url} onChange={handleSave} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Icon Library</FormLabel>
            <Input name="lib" placeholder="Library (e.g., fa-solid)" value={selectedWebsite.image.lib} onChange={handleSave} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Icon Name</FormLabel>
            <Input name="icon" placeholder="Icon Name (e.g., fa-hippo)" value={selectedWebsite.image.icon} onChange={handleSave} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Preview Icon</FormLabel>
            {selectedWebsite.image.lib && selectedWebsite.image.icon ? (
              <FontAwesomeIcon icon={[selectedWebsite.image.lib, selectedWebsite.image.icon]} size="2x" />
            ) : (
              <p>Icon not available</p>
            )}
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
  );
};

export default AdminEditModal;
