import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "../contexts/providers/AuthContextProvider";
import type { DehydratedState } from "@tanstack/react-query";

function MyApp({ Component, pageProps }: AppProps<{dehydratedState: DehydratedState}>) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp
