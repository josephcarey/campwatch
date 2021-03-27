import { ChakraProvider } from "@chakra-ui/react";
import BasicLayout from "../common/layouts/basic-layout";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Campwatch: MN Campsites</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider>
        <BasicLayout>
          <Component {...pageProps} />
        </BasicLayout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
