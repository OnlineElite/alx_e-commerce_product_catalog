import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layouts/Layout"
import { useEffect } from "react";
import { setTokens, setUser } from "@/store/slices/authSlice";
import { Provider } from 'react-redux'
import store from "@/store/index"

export default function App({ Component, pageProps }: AppProps) {
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const access = localStorage.getItem("accessToken");
      const refresh = localStorage.getItem("refreshToken");
      const user = localStorage.getItem("user");

      if (access && refresh) {
        store.dispatch(setTokens({ access, refresh }));
      }

      if (user) {
        store.dispatch(setUser(JSON.parse(user)));
      }
    }
  }, []);
  
  return (
    <Provider store={store} >
      <Layout>
        <Component {...pageProps}  className="relative" />
      </Layout>
    </Provider>
  )
}
