/** @format */

import React from "react";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
const AdminDeleteModal = ({ isOpen, onClose, overlay, website }) => {
  const cancelRef = React.useRef();

  const handleDelete = () => {
    fetch(`http://10.10.12.45:8080/api/v1/websites/delete/${website.id}`, {
      method: "DELETE",
    }).then(() => console.log("Delete successful"));
    onClose();
  };

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
              Are you sure to delete <b>{`${website ? website.name : null}`}</b> website? You can't undo this action afterward
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button type="button" colorScheme="red" ml={3} onClick={handleDelete}>
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
