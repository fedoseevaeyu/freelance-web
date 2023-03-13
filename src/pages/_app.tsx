import dayjs from "dayjs";
import Head from "next/head";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@styles/globals.css";
import "dayjs/locale/ru";
import { DatesProvider } from "@mantine/dates";
import { SWRConfig } from "swr";

import fetchJson from "@lib/fetch-json";
dayjs.locale("ru");

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => {
            console.error(err);
          },
        }}
      >
        <DatesProvider settings={{ locale: "ru" }}>
          <Head>
            <title>Freelance</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          </Head>

          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: "light",
            }}
          >
            <Notifications />
            <Component {...pageProps} />
          </MantineProvider>
        </DatesProvider>
      </SWRConfig>
    </QueryClientProvider>
  );
}
