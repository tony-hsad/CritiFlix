import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "../contexts/providers/AuthContextProvider";
import SearchContextProvider from "../contexts/providers/SearchContextProvider";
import type { DehydratedState } from "@tanstack/react-query";

function MyApp({ Component, pageProps }: AppProps<{dehydratedState: DehydratedState}>) {
  return (
    <AuthContextProvider>
      <SearchContextProvider>
        <Component {...pageProps} />
      </SearchContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
