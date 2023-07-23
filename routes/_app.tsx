// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>iyochi's ポイントカード</title>
        <link rel="icon" href="/14logo.svg" type="image/svg+xml" />
      </Head>
      <Component />
    </>
  );
}
