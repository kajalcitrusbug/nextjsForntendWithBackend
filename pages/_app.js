import { SessionProvider } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../styles/globals.css";
import Header from "./component/Header";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
