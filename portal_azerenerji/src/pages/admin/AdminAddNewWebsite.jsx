/** @format */

import React, { useState } from "react";
import { ChakraProvider, FormControl, FormLabel, Input, Button, Box, Flex, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import * as AWS from "aws-sdk";
import alertify from "alertifyjs";
import { useNavigate } from "react-router-dom";

const AdminAddNewWebsite = () => {
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(null);
  const [data, setData] = useState({
    name: "",
    url: "",
    image: "",
  });
  const [awss3, setAwss3] = useState({
    name: data.name,
    url: data.url,
    image: null,
  });
  const uploadFile = () => {
    if (!data.image) {
      alert("Please select a file.");
      return;
    }

    // Dosya verisini al
    const fileData = awss3.image;
    // S3 Bucket Adı
    const S3_BUCKET = "portalazerenerji";

    // S3 Bölgesi
    const REGION = "eu-north-1";

    // S3 Kimlik Bilgileri
    AWS.config.update({
      accessKeyId: "AKIA4MTWK2D4ML2D3AWJ",
      secretAccessKey: "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",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Dosya Parametreleri
    const params = {
      Bucket: S3_BUCKET,
      Key: fileData.name,
      Body: fileData,
    };

    // S3'ye Dosyayı Yükle
    s3.putObject(params)
      .on("httpUploadProgress", (evt) => {
        // Dosya yükleme ilerlemesi
        // console.log("Yükleniyor " + parseInt((evt.loaded * 100) / evt.total) + "%");
      })
      .promise()
      .then((data) => {
        alertify.success("Şəkil bazaya uğurla yükləndi");
        postWebsite();
      })
      .catch((err) => {
        console.error(err);
        alertify.error("Şəkil bazaya yüklənən zaman xəta baş verdi.");
      });
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setData({ ...data, [e.target.name]: e.target.files[0].name });
      setAwss3({ ...awss3, [e.target.name]: e.target.files[0] });
      setSelectedImg(URL.createObjectURL(e.target.files[0]));
      return;
    } else {
      setAwss3({ ...awss3, [e.target.name]: e.target.value });
      setData({ ...data, [e.target.name]: e.target.value });
      return;
    }
  };
  const postWebsite = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    };
    fetch("http://10.10.12.45:8080/api/v1/websites/save", requestOptions)
      .then((response) => response.json())
      .then((data) => setData(data));
    console.log(data);
    alertify.success("Website uğurla əlavə olundu");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    uploadFile();
    navigate("/admin/websites");
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

              <FormControl id="file" mt={4} onChange={(e) => handleChange(e)}>
                <FormLabel>Upload File</FormLabel>
                <Input type="file" pt={1} name="image" required />
              </FormControl>
              {selectedImg ? (
                <Text my={4}>
                  Selected file: <Image mt={4} h={14} src={selectedImg} alt="image" />
                </Text>
              ) : (
                <Text my={4}>Please Select image</Text>
              )}

              <Button fontSize={20} type="submit" colorScheme="blue" width="full">
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
