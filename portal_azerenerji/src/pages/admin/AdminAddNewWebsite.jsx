/** @format */

import React, { useContext, useState } from "react";
import { ChakraProvider, FormControl, FormLabel, Input, Button, Box, Flex } from "@chakra-ui/react";
import alertify from "alertifyjs";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../LoaderContext";
import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminAddNewWebsite = () => {
  const navigate = useNavigate();
  const { setReload } = useContext(LoaderContext);
  const [data, setData] = useState({});
  const [iconName, setIconName] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (e.target.name === "image") {
      setIconName(e.target.value);
    }
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postWebsite();
    navigate("/admin/websites");
  };

  const postWebsite = () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(data),
      };
      fetch("https://bportal.azerenerji.az/api/v1/websites/save", requestOptions)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
        })
        .then((data) => setData(data));
      data ? setReload(true) : setReload(false);

      alertify.success("Website uğurla əlavə olundu");
    } catch (error) {
      alertify.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <>
      <ChakraProvider>
        <Flex minWidth="6xl" height="80vh" alignItems="center" justifyContent="center">
          <Box maxW="container.sm" m="auto" w="100%" p="4">
            <h1 style={{ textAlign: "center" }}> Add New Website</h1>
            <form onSubmit={handleSubmit}>
              <FormControl id="text" onChange={(e) => handleChange(e)}>
                <FormLabel>Website Name</FormLabel>
                <Input type="text" required name="name" placeholder="Enter website name" value={data.name} />
              </FormControl>
              <FormControl id="url" my={4} onChange={(e) => handleChange(e)}>
                <FormLabel>Website url</FormLabel>
                <Input type="text" name="url" placeholder="Enter website url" value={data.url} />
              </FormControl>
              <FormControl id="file" my={4} onChange={(e) => handleChange(e)}>
                <FormLabel>Font Awesome Icon(fa)</FormLabel>
                <Input type="text" pt={1} name="image" required placeholder="please enter Font Awesome Icon" value={data.image} />
              </FormControl>
              {iconName ? <FontAwesomeIcon icon={iconName} size="2x" /> : <p>Icon not available</p>}
              <Button fontSize={20} mt={4} type="submit" colorScheme="blue" width="full">
                Create
              </Button>
            </form>
          </Box>
        </Flex>
      </ChakraProvider>
    </>
  );
};

export default AdminAddNewWebsite;
