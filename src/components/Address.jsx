import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import Avatar from "@davatar/react";
import { useAddress, useChainId, useDisconnect } from "@thirdweb-dev/react";
import { AiOutlineLogout } from "react-icons/ai";
import truncateMiddle from "truncate-middle";
import React from "react";

function Address() {
  const address = useAddress();
  const ChainId = useChainId();
  const disconnect = useDisconnect();

  return (
    <>
      {address && (
        <Flex
          top="3%"
          right="2%"
          position="absolute"
          zIndex="3"
          alignItems="center"
          className="address-box"
          px="1em"
          py="0.5em"
        >
          <Avatar size={34} address={address} />
          <Box mx="15px">
            <Text fontWeight={500} fontSize="15px" lineHeight="1.2em">
              {truncateMiddle(address || "", 5, 4, "...")}
              <br />
              {ChainId == "80001" ? "Mumbai" : ChainId}
            </Text>
          </Box>
          <IconButton
            aria-label="logout"
            icon={<AiOutlineLogout />}
            onClick={disconnect}
            size="sm"
          />
        </Flex>
      )}
    </>
  );
}

export default Address;
