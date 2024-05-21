/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Container, Wrap, WrapItem, Center, Image, Flex } from "@chakra-ui/react";
import logo from "../images/AzerenerjiLogo-removebg-preview.png";
import { LoaderContext } from "../LoaderContext";

const Home = () => {
  const [data, setData] = useState([]);
  const { reload, setReload } = useContext(LoaderContext);

  const fetchData = () => {
    fetch("http://10.10.12.45:8081/api/v1/websites")
      .then((res) => res.json())
      .then((data) => setData(data));
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [reload, setReload]);

  return (
    <>
      <div className="backgroundImage">
        <Container maxW="xxl" mt="40px" className="homeContainer">
          <Container mb="40px">
            <Center>
              <div className="cardHomeLogo">
                <div className="cardHomeLogoBg">
                  <Image className="logoAzerenerji" objectPosition="center" objectFit="" src={logo} alt="Azerenerji logo"></Image>
                </div>
                <div className="cardHomeLogoBlob"></div>
              </div>
            </Center>
          </Container>
          <Wrap spacing="50px" justify="center">
            {data && data.length > 0 ? (
              data.map((item) => (
                <WrapItem>
                  <Center>
                    <div className="homeCard">
                      <p className="homeHeading">{item.name}</p>
                      {/* <p className="homeBottom">AzərEnerji ASC</p> */}
                      <Image
                        objectFit="contain"
                        className="homeImage"
                        w={20}
                        h={10}
                        src={`https://portalazerenerji.s3.eu-north-1.amazonaws.com/${item.image}`}
                        alt="Azerenerji logo"
                      />
                    </div>
                  </Center>
                </WrapItem>
              ))
            ) : (
              <Flex justifyContent="center" alignItems="center" height="50vh">
                <h1>Website not found</h1>
              </Flex>
            )}
          </Wrap>
        </Container>
      </div>
      {/* <Link to='route' target='_blank' rel='noopener noreferrer' /> */}
    </>
  );
};

export default Home;
