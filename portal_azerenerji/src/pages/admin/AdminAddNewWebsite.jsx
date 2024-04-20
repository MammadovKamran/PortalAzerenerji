/** @format */

import React from "react";
import { ChakraProvider, FormControl, FormLabel, Input, Button, Box, Flex } from "@chakra-ui/react";
const AdminAddNewWebsite = () => {
  const [data, setData] = React.useState({
    name: "",
    url: "",
    image: {},
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setData({ ...data, [e.target.name]: { name: e.target.files[0].name, size: e.target.files[0].size } });
      return;
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
      return;
    }
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    };
    fetch("http://10.10.12.45:8080/api/v1/websites/create", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data, "post response"));
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
              <FormControl id="url" mt={4} onChange={(e) => handleChange(e)}>
                <FormLabel>Website url</FormLabel>
                <Input type="text" name="url" placeholder="Enter website url" value={data.url} />
              </FormControl>

              <FormControl id="file" mt={4} onChange={(e) => handleChange(e)}>
                <FormLabel>Upload File</FormLabel>
                <Input type="file" pt={1} name="image" required />
              </FormControl>

              <Button type="submit" colorScheme="blue" mt={4} width="full">
                Create New
              </Button>
            </form>
          </Box>
        </Flex>
      </ChakraProvider>
    </>
  );
};

export default AdminAddNewWebsite;
