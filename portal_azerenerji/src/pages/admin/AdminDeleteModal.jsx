/** @format */

import React, { useContext } from "react";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { LoaderContext } from "../../LoaderContext";
import { alertify } from "alertifyjs";
const AdminDeleteModal = ({ isOpen, onClose, overlay, website }) => {
  const cancelRef = React.useRef();
  const { setReload } = useContext(LoaderContext);

  const handleDelete = () => {
    try {
      fetch(`http://10.10.12.45:8081/api/v1/websites/delete/${website.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        } else {
          alertify.success("Website deleted successfully");
          return res.json();
        }
      });
    } catch (error) {
      alertify.error("There was a problem with the fetch operation:", error);
    }

    onClose();
    setReload(true);
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
