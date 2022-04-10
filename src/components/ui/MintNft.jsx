import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import React from "react";
import badge from "../../assets/badge.png";

function MintNft() {
  return (
    <Box h="100%" my="auto">
      <Flex
        mt="15%"
        alignContent={"center"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection="column"
      >
        <Image boxSize="100px" src={badge}></Image>
        <Heading mt="1em" color="whitesmoke">
          Mint your free FraisDAO Membership NFT
        </Heading>
        <Button mt="1em">Mint (Free)</Button>
      </Flex>
    </Box>
  );
}

export default MintNft;
