import type { AppProps } from "next/app";
import Head from "next/head";
import { useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";

import Navbar from "../layout/Navbar";

import "../styles/styles.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-medium-image-zoom/dist/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef(null);

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>Y11 Interactive Website</title>
          <meta
            lang="en"
            name="description"
            content="This is the website to the current Y11s. You'll find all the information you need here"
          />
          <link rel="icon" href={"/favicon.ico"} />
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
