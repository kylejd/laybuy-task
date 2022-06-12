import { NextPage } from "next";
import type { AppProps } from "next/app";
import { AuthProvider } from "../stores/authContext";

export type CustomPageProps = {
  requiresAuth?: boolean;
  redirectUnauthenticatedTo?: string;
};

export type CustomPage = NextPage & CustomPageProps;

interface CustomAppProps extends Omit<AppProps, "Component"> {
  Component: CustomPage;
}

function MyApp({ Component, pageProps }: CustomAppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
