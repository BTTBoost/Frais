import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import theme from './theme';
import './index.css';
import "./hero.css";
import Dapp from './components/Dapp';

const activeChainId = ChainId.Rinkeby;

ReactDOM.render(
  <ThirdwebProvider desiredChainId={activeChainId}>
    <ChakraProvider theme={theme}>
      <Router>
        <Dapp />
      </Router>
    </ChakraProvider>
  </ThirdwebProvider>,
  document.getElementById('root'),
);
