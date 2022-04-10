import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  Image,
} from "@chakra-ui/react";
import React from "react";
import metamask from "../../assets/metamask-fox.svg";
import skill from "../../assets/skill.svg";
import { useMetamask } from "@thirdweb-dev/react";

function Web3modal({ isOpen, onClose }) {
  const connectMetamask = useMetamask();

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Box py="1em" h="min-content">
              <Flex justifyContent="center">
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  flexDir="column"
                  px="2em"
                  py="1em"
                  mr="40px"
                  _hover={{ backgroundColor: "whitesmoke" }}
                  rounded="20px"
                  cursor="pointer"
                  onClick={() => {
                    connectMetamask();
                    onClose();
                  }}
                >
                  <Image src={metamask} width={100} height={100} />
                  <Text textTransform="uppercase" mt="2em">
                    Metamask
                  </Text>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  flexDir="column"
                  px="2em"
                  py="1em"
                  _hover={{ backgroundColor: "whitesmoke" }}
                  rounded="20px"
                  cursor="pointer"
                  onClick={() => {
                    // handleLogin();
                    onClose();
                  }}
                >
                  <Image src={skill} width={100} height={100} />
                  <Text textAlign="center" textTransform="uppercase" mt="2em">
                    Skill wallet
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Web3modal;
