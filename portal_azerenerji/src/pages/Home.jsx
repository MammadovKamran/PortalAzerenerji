/** @format */

import React, { useEffect, useState } from "react";
import { Container, Wrap, WrapItem, Center, Image } from "@chakra-ui/react";
import logo from "../images/AzerenerjiLogo-removebg-preview.png";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/websites")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

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
                    <p className="homeBottom">AzərEnerji ASC</p>
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
