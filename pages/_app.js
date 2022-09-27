import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'styles/globals.css';

import { Support, Toast } from 'components';

import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <GoogleOAuthProvider clientId="261892431720-du7o47ko9oqmcuq10e2s6l305q5aa0lf.apps.googleusercontent.com">
        <Toast />
        <Support />
        <NextNProgress color="green" />
        <Component {...pageProps} />
      </GoogleOAuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
