import React from 'react';
import { Button } from '@chakra-ui/react';
import { FaWallet } from 'react-icons/fa';
import { useMetamask } from '@thirdweb-dev/react';

interface ConnectWalletProps {
  connectWallet: () => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({
  connectWallet,
}: ConnectWalletProps) => {
  const connectWithMetamask = useMetamask();
  return <Button rightIcon={<FaWallet/>} onClick={async()=>{await connectWithMetamask();await connectWallet();}}>Connect Wallet</Button> 
} 

export default ConnectWallet;