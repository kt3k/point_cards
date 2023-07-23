// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { Head } from "$fresh/runtime.ts";
import PointCard from "components/PointCard.tsx";
import PointCardManager from "islands/PointCardManager.tsx";
import { Main } from "components/Containers.tsx";
import Footer from "components/Footer.tsx";

export default function ExampleCards() {
  return (
    <>
      <Head>
        <title>Iyochi's point card</title>
      </Head>
      <Main>
        <PointCardManager
          class="mt-5"
          card={{
            id: "",
            points: 6,
            spec: { max: 10, subtitle: "Rank 1" },
            issuedAt: new Date("2022-01-01"),
          }}
          holder={{ id: "", name: "パパ" }}
        />
        <PointCardManager
          class="mt-5"
          card={{
            id: "",
            points: 3,
            spec: { max: 10, subtitle: "Rank 1" },
            issuedAt: new Date("2022-01-01"),
          }}
          holder={{ id: "", name: "レイレイ" }}
        />
        <PointCard
          class="mt-4"
          card={{
            id: "",
            points: 7,
            spec: { max: 12, subtitle: "Rank 2", row: 4 },
            issuedAt: new Date("2022-02-01"),
          }}
        />
        <PointCard
          class="mt-4"
          card={{
            id: "",
            points: 7,
            spec: { max: 12, subtitle: "Rank 3" },
            issuedAt: new Date("2022-03-04"),
          }}
        />
        <PointCard
          class="mt-4"
          card={{
            id: "",
            points: 7,
            spec: { max: 12, subtitle: "Rank 4", row: 4 },
            issuedAt: new Date("2022-02-01"),
          }}
        />
      </Main>
    </>
  );
}
