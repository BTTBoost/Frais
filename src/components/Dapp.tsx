import * as React from 'react';
import { ethers } from 'ethers';
import { Routes, Route } from 'react-router';
import {
  Box,
  useToast
} from '@chakra-ui/react';
import { RINKEBY_NETWORK_ID, HARDHAT_NETWORK_ID } from '../constants/chain';
import { AddressProvider } from '../context/Address';
import { SignerProvider } from '../context/Signer';
import { ProviderProvider } from '../context/Provider';
import Navigation from './navigation/Navigation';
import Home from './pages/home/Home';
import Courses from './pages/courses/Courses';
import Course from './pages/course/CourseHomepage';
import Create from './pages/create/Create';
import Request from './pages/request/Request';
import Footer from './ui/Footer';
import Modules from './pages/modules/Modules';
import { CustomWindow } from '../types';
import CreateRequest from './pages/createRequest/CreateRequest';
import FourOhFour from './pages/404/404';
import Roadmap from './pages/roadmap/Roadmap';
import MintNft from './ui/MintNft';
import {
  useAddress,
  useMetamask,
  useEditionDrop,
  useToken,
} from "@thirdweb-dev/react";

declare let window: CustomWindow;

const Dapp: React.FC = () => {
  const toast = useToast();
  const [selectedAddress, setSelectedAddress] = React.useState<string>();
  const [balance, setBalance] = React.useState<number>();
  const [txBeingSent, setTxBeingSent] = React.useState();
  const [txError, setTxError] = React.useState();
  const [networkError, setNetworkError] = React.useState<string>();
  const [provider, setProvider] = React.useState<ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider>();
  const [signer, setSigner] = React.useState<ethers.Signer>();

  // Use the hooks thirdweb give us.
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log("👋 Address:", address);

  // Initialize our editionDrop contract
  const editionDrop = useEditionDrop(
    "0x11E81250D7b3cfE533b1ddFcFf308b43BFC69e12"
  );
  const token = useToken("0x2B10F2f8c8049304bad37883313f46b5fd8c7d5A");
  // State variable for us to know if user has our NFT.
  const [hasClaimedNFT, setHasClaimedNFT] = React.useState<boolean>(false);
  // isClaiming lets us easily keep a loading state while the NFT is minting.
  const [isClaiming, setIsClaiming] = React.useState<boolean>(false);
  const [checker, setChecker] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [memberTokenAmounts, setMemberTokenAmounts] = React.useState<string[]>([]);
  // The array holding all of our members addresses.
  const [memberAddresses, setMemberAddresses] = React.useState<string[]>([]);

  React.useEffect(() => {
    // If they don't have an connected wallet, exit!
    
    const checkBalance = async () => {
      try {
        const balance = await editionDrop?.balanceOf(address || "", 0);
        if (balance?.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!");
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.");
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Failed to get balance", error);
      }
    };
    checkBalance();
  }, [address, editionDrop]);

  React.useEffect(() => {
    success &&
      toast({
        title: "NFT Minted",
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    checker &&
      toast({
        title: "Please Wait!",
        description: "Minting your FraisDAO Nft...",
        status: "info",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
  }, [success, checker]);

  React.useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    // Just like we did in the 7-airdrop-token.js file! Grab the users who hold our NFT
    // with tokenId 0.
    const getAllAddresses = async () => {
      try {
        const memberAddresses =
          await editionDrop?.history.getAllClaimerAddresses(0);
        setMemberAddresses(memberAddresses || []);
        console.log("🚀 Members addresses", memberAddresses);
      } catch (error) {
        console.error("failed to get member list", error);
      }
    };
    getAllAddresses();
  }, [hasClaimedNFT, editionDrop?.history]);

  // This useEffect grabs the # of token each member holds.
  React.useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllBalances = async () => {
      try {
        const amounts : any = await token?.history.getAllHolderBalances();
        setMemberTokenAmounts(amounts || []);
        console.log("👜 Amounts", amounts);
      } catch (error) {
        console.error("failed to get member balances", error);
      }
    };
    getAllBalances();
  }, [hasClaimedNFT, token?.history]);

  // Now, we combine the memberAddresses and memberTokenAmounts into a single array
  const memberList = React.useMemo(() => {
    return memberAddresses.map((address) => {
      // We're checking if we are finding the address in the memberTokenAmounts array.
      // If we are, we'll return the amount of token the user has.
      // Otherwise, return 0.
      const member : any = memberTokenAmounts?.find(
        (holder) => holder === address
      );

      return {
        address,
        tokenAmount: member?.balance.displayValue || "0",
      };
    });
  }, [memberAddresses, memberTokenAmounts]);

  const mintNft = async () => {
    try {
      setChecker(true);
      setIsClaiming(true);
      await editionDrop?.claim("0", 1);
      console.log(
        `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop?.getAddress()}/0`
      );
      setHasClaimedNFT(true);
      setSuccess(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsClaiming(false);
    }
  };


  const resetState = () => {
    console.log('resetting state');
    setSelectedAddress(undefined);
    setBalance(undefined);
    setTxBeingSent(undefined);
    setTxError(undefined);
    setNetworkError(undefined);
    setProvider(undefined);
  }

  const checkNetwork = () => {
    if (
        window.ethereum.networkVersion === RINKEBY_NETWORK_ID
        || window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
      return true;
    }

    setNetworkError('Please connect Metamask to Rinkeby bossman');
    return false;
  }

  const initializeProvider = async () => {
    const infuraProvider = new ethers.providers.StaticJsonRpcProvider('https://rinkeby.infura.io/v3/dc71b76f925b44fa80b501543e747644');
    setProvider(infuraProvider);
  }

  const initializeEthers = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    setSigner(provider.getSigner(0));
  }

  const dismissNetworkError = () => {
    setNetworkError(undefined);
  }

  const dismissTxError = () => {
    setTxError(undefined);
  }

  const listenForAccountChange = (): void => {
    window.ethereum.on('accountsChanged', ([newAddress]: any) => {
      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the 'Connected
      // list of sites allowed access to your addresses' (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state 
      if (newAddress === undefined) {
        return resetState(); // Kind of funky, just stops execution of setSelectedAddress
      }
      
      setSelectedAddress(newAddress);
    });
  }

  const listenForNetworkChange = ():void => {
    // We reset the dapp state if the network is changed
    window.ethereum.on('networkChanged', () => {
      resetState();
    });
  }

  const connectWallet = async () => {
    // To connect to the user's wallet, we have to run this method.
    // It returns a promise that will resolve to the user's address.
    const [selectedAddress] = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

    if (!checkNetwork()) {
      return;
    }

    setSelectedAddress(selectedAddress);

    // We reinitialize it whenever the user changes their account.
    listenForAccountChange();
    
    listenForNetworkChange();
  }

  React.useEffect(() => {
    console.log(hasClaimedNFT);
    if (selectedAddress) {
      initializeEthers();
    }
  }, [selectedAddress])

  React.useEffect(() => {
    initializeProvider();
  }, []);

  return (
    <ProviderProvider value={provider}>
      <SignerProvider value={signer}>
          <AddressProvider value={selectedAddress}>
             <Navigation connectWallet={connectWallet}/>
                <Box pb={'300px'}>
                  <Routes>
                    <Route path='/' element={<Home hasClaimedNFT={hasClaimedNFT} memberAddresses={memberAddresses} mintNft={mintNft} />}/>
                    <Route path='/courses/:courseAddress' element={<Course/>}/>
                    <Route path='/courses/:courseAddress/newrequest' element={<CreateRequest/>}/>
                    <Route path='/courses/:courseAddress/requests/:requestIndex' element={<Request/>}/>
                    <Route path='/courses/:courseAddress/version/:courseVersion' element={<Modules/>}/>
                    <Route path='/courses' element={<Courses/>}/>
                    <Route path='/create' element={<Create/>}/>
                    <Route path='/roadmap' element={<Roadmap/>}/>
                    <Route path='*' element={<FourOhFour/>}/>
                  </Routes>
                </Box>
          </AddressProvider>
      </SignerProvider>
    </ProviderProvider>
    );
};

export default Dapp;