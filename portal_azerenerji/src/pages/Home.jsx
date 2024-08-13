/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Container, Wrap, WrapItem, Center, Image, Flex } from "@chakra-ui/react";
import logo from "../images/AzerenerjiLogo-removebg-preview.png";
import alertify from "alertifyjs";

import { LoaderContext } from "../LoaderContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons"; 
import { fab } from "@fortawesome/free-brands-svg-icons"; 

library.add(fas, far, fab);

const Home = () => {
  const [data, setData] = useState([]);
  const { reload, setReload } = useContext(LoaderContext);

  const fetchData = () => {
    try {
      fetch("http://10.10.12.45:8081/api/v1/websites")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          const formattedData = data.map((item) => {
            const parts = item.image.split(" ");
            return { ...item, image: { lib: parts[0], icon: parts[1] } };
          });
          setData(formattedData);
        })
        .catch((error) => {
          alertify.error("There was a problem with the fetch operation:", error);
        });
    } catch (error) {
      alertify.error("There was a problem with the fetch operation:", error);
    }
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
                <Link to={item.url}>
                  <WrapItem key={item.id}>
                    {" "}
                    <Center>
                      <div className="homeCard">
                        <p className="homeHeading">{item.name}</p>
                        {item.image.lib && item.image.icon ? (
                          <FontAwesomeIcon icon={[item.image.lib, item.image.icon]} size="2x" />
                        ) : (
                          <p>Icon not available</p>
                        )}
                      </div>
                    </Center>
                  </WrapItem>
                </Link>
              ))
            ) : (
              <Flex justifyContent="center" alignItems="center" height="50vh">
                <h1>Website not found</h1>
              </Flex>
            )}
          </Wrap>
        </Container>
      </div>
    </>
  );
};

export default Home;
