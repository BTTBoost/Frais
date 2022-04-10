import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Grid,
  useDisclosure,
} from "@chakra-ui/react";
import Hero from "./Hero";
import Address from "../../ui/Address";
import Web3modal from "../../ui/Web3modal";

function Home() {
  useEffect(() => {
    // console.log(connect[0].data.connected);
    document.addEventListener("mousemove", parallax);
  }, []);

  function parallax(e) {
    document.querySelectorAll(".px-move").forEach(function(move) {
      let moving_value = move.getAttribute("data-value");
      let x = (e.clientX * moving_value) / 100;
      let y = (e.clientY * moving_value) / 100;
      move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
    });
  }

  return (
    <>
      <Box zIndex="22" w="100%" className="hero-box" h="100vh">
        {/* <Web3modal onClose={onClose} isOpen={isOpen} /> */}
        <Heading position="absolute" top="3%" left="2%" color="whitesmoke">
          Frais
        </Heading>
        <Address />
        <div className="stripes-bg">
          <div className="stripes-bg__item stripes-1 px-move" data-value="-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1668.5 460.28"
              className="fill--orange"
            >
              <path d="M1228.55,255.69q1.73,3.85,3.43,7.73a2.4,2.4,0,0,0,1.08,2.61c32.87,60.57,65.48,121.3,98.89,181.58,5.72,10.31,13.79,15.73,28.9,10.86,18.54-6,33.35-15.55,49-26.67,45.28-32.13,92.35-61.73,138.66-92.42,35.44-23.48,70.72-47.15,106.21-70.55,11.17-7.37,16.75-16.13,12.28-30.12-8.44-26.53-16.12-53.3-24.19-80-45.21,26.84-90.78,53.12-135.53,80.71-40.78,25.13-80.64,51.7-122.7,78.77-10.88-18.77-20.4-35.17-29.89-51.59q-41.7-72.09-83.37-144.2c-3.11,1.92-6.12,4.15-9.19,6.2,3.07-2,6.07-4.28,9.19-6.2l-2.7-4-3.29-3.84.1.1-3.59-3.94.33,0c-3.38-6.15-6.32-12.61-10.25-18.39-15-22.1-21.18-22.44-40.76-2.82l-.18.14-11.33,6.78c-19.64,12.19-39.9,23.48-58.8,36.71-59.26,41.53-118,83.8-177,125.69-4.15,2.94-8.87,5.08-13.88,7.92l-26.65-44.14L885.34,158.1c-22.23-28.15-44.28-56.45-66.83-84.37C812.93,66.8,805.68,61.17,799.18,55c-19.61-18.73-20.13-19.35-41.78-2q-42.71,34.34-83.92,70.55c-45.9,40.32-91.71,80.82-136.61,122.27-16.75,15.51-30.89,33.82-47.52,52.3l-148.43-230-48.27-64a8.69,8.69,0,0,1-3.2-.89L281.6,0l-5.67.2C263,10.35,249.61,19.92,237.31,30.77c-18.15,16-38.22,30.83-52.72,49.79-56.67,74.15-111.82,149.5-166.81,224.9C-7,339.39-6.38,340.12,22.65,371.76c9.67,10.55,20.4,20.12,31,29.78,10.12,9.22,18.61,9.73,27.73-3,29.15-40.82,58.64-81.46,89.27-121.19,29.83-38.69,61.24-76.17,93.85-116.54,6.08,7.89,12.82,15.14,17.85,23.42,37.22,61.41,73.19,123.55,111.5,184.23,15.18,24,35.36,44.93,53.22,67.25l19.19,16.84,305-265,94.21,158.1,3.26,7.1,3.72,5.06,36.47,62.77c6.09-1.8,13.11-2.22,18.13-5.58,67.45-45.37,135-90.57,201.67-137.09,26.82-18.71,51.54-40.44,77.71-61.2l7.85,14,.4-.36-.39.36Q1221.37,243.14,1228.55,255.69Z" />
            </svg>
          </div>
          <div className="stripes-bg__item stripes-2 px-move" data-value="-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 710.74 845.38"
              className="fill--fucsia"
            >
              <path d="M.56,178.56c-2.48-14.27,3.4-23.31,15.8-30.78s22.84-17.51,34.16-26.43c23.62-16,47.87-31.09,70.71-48.08,55.16-41,119.36-56.63,185.26-67.86C319.68,3.16,333,1.87,346.32.13c34-1.4,65.27,8.77,95.42,23.33C484.89,54,502.2,97.7,505.67,148.5c-.35,4.23-1,8.47-1,12.7.29,48.24-15.26,90.74-52,122.11-31,26.46-65.95,48.21-98.23,73.26-27.88,21.64-54.78,44.61-81.45,67.74-11.17,9.68-12.53,24.92-4.43,35,5.84,7.27,20.26,12.26,30,11.06,58.16-7.18,116.71-13.4,173.84-25.87,56.75-12.41,112.1-18.55,168.28-.57,33.55,16.33,61.68,38.23,68.92,77.22,2.7,14.48-.07,30-.56,45-.24,7.88-.95,15.75-1.45,23.62-29.63,70.57-78.3,123.72-147.8,155.76-68.77,31.7-138.64,61-208.14,91.12-29.72,12.88-29.84,12.62-51.39-9.09L272.1,766.77c2.42-16.78,16.8-21.22,29-27.14,55.59-26.84,111.73-52.53,167-80.06,25.06-12.49,49.72-26.56,72.29-43,20.24-14.77,39.37-32.25,47.59-58.93-21.5,0-41.79-2.4-61.33.44-67.67,9.82-135.43,19.67-202.47,33-52.21,10.38-101.66,12-147.78-19-25.44-23.53-33-55.65-41.87-87.12,1.19-21.26-1.49-43.65,4.34-63.55,17.15-58.61,57.38-101,105.09-136.93,40.1-30.2,81.65-58.72,119.51-91.51,13.31-11.52,18.68-33.09,25.53-50.89,4.13-10.76-1-18.25-14.33-19.52-53.1-5-103.73,4-150.28,29.48-34.61,18.94-67.21,41.56-100.69,62.56q-29,18.19-58,36.47l-3.63,4.6.18-.55c-7.85-5-18.06-8.38-23.11-15.43C25.18,220.14,13.29,199.05.56,178.56Z" />
            </svg>
          </div>
          <div className="stripes-bg__item stripes-3 px-move" data-value="-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1048.1 578.33"
              className="fill--green"
            >
              <path d="M1048.1,417.41S708.22-40.44,476.44,2.89C476.44,2.89,313.52-39,0,372.23L157.88,475.92S398.21,116.61,555.82,181,942.41,578.33,942.41,578.33Z" />
            </svg>
          </div>
        </div>
        <Box className="hero-center-text">
          <Box className="px-move" data-value="1" align="center">
            <Text fontWeight="400">
              a <span className="hero-span">creative</span> platform to learn
              yield farming
            </Text>
            {/* {!connect[0].data.connected ? ( */}
            <Button
              fontSize="0.8vw"
              mt="4rem"
              fontWeight="400"
              color="white"
              bg="transparent"
              _hover={{ bg: "transparent" }}
              className="hero-btn"
              // onClick={onOpen}
            >
              Connect Wallet
              <svg className="button-stroke" viewBox="0 0 154 13">
                <use href="#line" />
              </svg>
              <svg className="button-stroke" viewBox="0 0 154 13">
                <use href="#line" />
              </svg>
            </Button>
            {/* ) : (
              <Button
                fontSize="0.8vw"
                mt="4rem"
                fontWeight="400"
                color="white"
                bg="transparent"
                _hover={{ bg: "transparent" }}
                className="hero-btn"
                // onClick={onOpen}
              >
                Get Started..
                <svg className="button-stroke" viewBox="0 0 154 13">
                  <use href="#line" />
                </svg>
                <svg className="button-stroke" viewBox="0 0 154 13">
                  <use href="#line" />
                </svg>
              </Button>
            )} */}

            {/* </Link> */}
          </Box>
        </Box>
      </Box>

      {/* <Box bg="#111" pt="2rem" className="hero-box" h="100vh">
        <div class="menu-main__path menu-main__path--1 px-move" data-value="-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 412.1 604.6"
            class="stroke--pink-3 svgMorph"
          >
            <path
              class="path-1"
              d="M58.7,27.8c11.7,24.6,121,153.8,150,192.1c32.1,42.3,70.8,120.6,86.5,162.6s63.3,149.4,98.4,159.7"
            ></path>
          </svg>
        </div>
        <div class="menu-main__path menu-main__path--2 px-move" data-value="-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 746 818.9"
            class="stroke--green svgMorph"
          >
            <path
              class="path-1"
              d="M62.1,19.3c4.2,13.5,30.4,68.6,59.1,78c29,9.5,77,57.9,106.9,79.2s91.1,84.5,106,103.7c14.9,19.2,105.8,93.9,131.4,140.9c25.6,46.9,71.4,179,88.4,217.4c17.1,38.4,78.3,67.5,105.8,81.4c20.4,10.3,29.9,46,42.7,46"
            ></path>
          </svg>
        </div>
        <div class="menu-main__path menu-main__path--3 px-move" data-value="-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 963.3 1139.4"
            class="stroke--fucsia svgMorph"
          >
            <path
              class="path-1"
              d="M48,265.1c0,0,305.9-241.6,423.2-176.4s156.1,127.8-48.7,360.5S264,744.5,559.9,735.5c295.9-8.9,385.8-19.2,299.6,75.4s-417,287.6-417,287.6"
            ></path>
          </svg>
        </div>
        <Heading
          className="px-move"
          px="2rem"
          py="4%"
          color="#fff"
          fontSize="2.2vw"
          align="center"
          fontFamily="PressStart2P"
          fontWeight="400"
          data-value="0.2"
          position="relative"
        >
          Begin an <span className="hero-span">Amazing</span> Journey
        </Heading>
        <Box
          color="#000"
          fontSize="14px"
          fontWeight="400"
          fontFamily="PressStart2P"
          className="feature-box"
        >
          <Box position="relative">
            <Box
              align="center"
              bg="whitesmoke"
              maxW="500px"
              p="2rem"
              rounded="0.25rem"
              boxShadow={
                "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
              }
            >
              {" "}
              <Image
                className="px-move"
                data-value="0.4"
                mt="0.5rem"
                boxSize="100px"
                src={crypto}
              />
              <Text pt="3rem">Choose your pool</Text>
            </Box>
            <span className="feature-box-shadow"></span>
          </Box>
          <Box position="relative">
            <Box
              align="center"
              bg="whitesmoke"
              maxW="500px"
              p="2rem"
              rounded="0.25rem"
              boxShadow={
                "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
              }
            >
              <Image
                className="px-move"
                data-value="0.4"
                mt="0.5rem"
                boxSize="100px"
                src={farming}
              />
              <Text pt="3rem">See your returns</Text>
            </Box>
            <span className="feature-box-shadow"></span>
          </Box>
          <Box position="relative">
            <Box
              align="center"
              bg="whitesmoke"
              maxW="500px"
              p="2rem"
              rounded="0.25rem"
              boxShadow={
                "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
              }
            >
              {" "}
              <Image
                className="px-move"
                data-value="0.4"
                mt="0.5rem"
                boxSize="100px"
                src={nft}
              />
              <Text pt="3rem">Get NFT as your reward</Text>
            </Box>
            <span className="feature-box-shadow"></span>
          </Box>
        </Box>
      </Box> */}
    </>
  );
}

export default Home;
