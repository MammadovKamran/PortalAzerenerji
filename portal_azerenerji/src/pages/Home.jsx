/** @format */

import React, { useEffect, useState } from "react";
import { Container, Wrap, WrapItem, Center, Image } from "@chakra-ui/react";
import logo from "../images/AzerenerjiLogo-removebg-preview.png";

// fetch("http://10.10.12.45:8080/api/v1/websites/find-by-id/1")
// fetch("http://10.10.12.45:8080/api/v1/websites")

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://10.10.12.45:8081/api/v1/websites")
      .then((res) => res.json())
      .then((data) => setData(data))
      .then((data) => console.log(data));
  }, []);

  console.log(data);

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
            {data.map((item) => (
              <WrapItem>
                <Center>
                  <div className="homeCard">
                    <p className="homeHeading">{item.name}</p>
                    {/* <p className="homeBottom">AzərEnerji ASC</p> */}
                    <Image
                      objectFit="contain"
                      className="homeImage"
                      src={`https://portalazerenerji.s3.eu-north-1.amazonaws.com/${item.image}`}
                      alt="Azerenerji logo"
                    />
                  </div>
                </Center>
              </WrapItem>
            ))}
          </Wrap>
        </Container>
      </div>
      {/* <Link to='route' target='_blank' rel='noopener noreferrer' /> */}
    </>
  );
};

export default Home;
