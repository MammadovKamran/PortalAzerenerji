/** @format */

import React, { useContext } from "react";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { LoaderContext } from "../../LoaderContext";
import { alertify } from "alertifyjs";
import Cookies from "js-cookie";

const AdminDeleteModal = ({ isOpen, onClose, overlay, website }) => {
  const cancelRef = React.useRef();
  const {  setReload } = useContext(LoaderContext);

  const handleDelete = () => {
    try {
      fetch(`http://10.10.12.45:8081/api/v1/websites/delete/${website.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${Cookies.get("token")}` },
      }).then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            throw new Error(errorData.error || `Silme işlemi başarısız oldu, Durum Kodu: ${res.status}`);
          });
        }
        setReload(true);
      });
    } catch (error) {
      alertify.error("There was a problem with the fetch operation:", error);
    }
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
