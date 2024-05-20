/** @format */

import { useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, Image, Input, Stack } from "@chakra-ui/react";
import { PasswordField } from "./PasswordField";
import Logo from "../../images/AzerenerjiLogo.png";
import alertify from "alertifyjs";
import Cookies from "js-cookie";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email && password) {
      fetch("http://10.10.12.45:8081/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          rememberMe: false,
        }),
      })
        .then((response) => {
          if (response.status === 401) {
            alertify.error("Please enter your email or password!");
            navigate("/admin");
          } else if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("id", data.id);
          Cookies.set("token", data.accessToken, { expires: 7, secure: true });

          navigate(`/admin/websites`);
          alertify.success("Successfully logged in!");
        });
    } else {
      alertify.error("Please enter your email or password!");
    }
    e.preventDefault();
  };

  return (
    <>
      <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
        <Stack spacing="8">
          <Stack spacing="6" alignItems="center">
            <Image borderRadius="lg" alt="Logo" width="200px" height="100px" objectFit="cover" objectPosition="center" src={Logo} />
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading color="#0069A6" size={{ base: "xs", md: "lg" }}>
                Log in
              </Heading>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}>
            <Stack spacing="6">
              <form onSubmit={handleSubmit}>
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="text">Email</FormLabel>
                    <Input id="email" type="email" ref={emailRef} required />
                  </FormControl>
                  <PasswordField ref={passwordRef} required />
                </Stack>
                <Stack spacing="6" mt={8}>
                  <Button width="100%" backgroundColor="#0069A6" color="white" type="submit">
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default Login;
