import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
const AdminDeleteModal = ({ isOpen, onClose, overlay, website }) => {
  const [data, setData] = useState({
    id: "",
    name: "",
    url: "",
    logo: "",
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
      setData({ id: website.id, name: website.name || "", url: website.url || "", logo: website.logo || "" });
    }
  }, [website]);
  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        {overlay}
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Website
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure to delete <b>{`${data.name}`}</b> website? You can't undo this action afterward
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" ml={3} onClick={(e) => handleDelete(e)}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AdminDeleteModal;
