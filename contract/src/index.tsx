import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Poll from "./Poll";

import { extendTheme, ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { m_AppBgColor } from "./Constants";

import {
  WalletProvider,
} from '@suiet/wallet-kit';

// const colors = {
//   brand: {
//     900: '#1a365d',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
// }

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  styles: {
    global: {
      // styles for the `body`
      body: {
        // background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)"
        background: m_AppBgColor,
      },
    },
  },
});

// const theme = extendTheme({ colors })

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ChakraProvider theme={theme}>
    <WalletProvider>
    <App />
    </WalletProvider>
  </ChakraProvider>
);