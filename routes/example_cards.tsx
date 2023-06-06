// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { Head } from "$fresh/runtime.ts";
import PointCard from "components/PointCard.tsx";

export default function ExampleCards() {
  return (
    <>
      <Head>
        <title>Iyochi's point card</title>
      </Head>
      <div class="flex flex-col items-center bg-red-50 min-h-[100vh]">
        <PointCard
          card={{
            id: "",
            points: 4,
            spec: { max: 10, subtitle: "Rank 1" },
            issuedAt: new Date("2022-01-01"),
          }}
        />
        <PointCard
          card={{
            id: "",
            points: 7,
            spec: { max: 12, subtitle: "Rank 2", row: 4 },
            issuedAt: new Date("2022-02-01"),
          }}
        />
        <PointCard
          card={{
            id: "",
            points: 7,
            spec: { max: 12, subtitle: "Rank 3" },
            issuedAt: new Date("2022-03-04"),
          }}
        />
        <PointCard
          card={{
            id: "",
            points: 7,
            spec: { max: 12, subtitle: "Rank 4", row: 4 },
            issuedAt: new Date("2022-02-01"),
          }}
        />
      </div>
    </>
  );
}
