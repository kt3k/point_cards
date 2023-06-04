import { Head } from "$fresh/runtime.ts";
import PointCard from "components/PointCard.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Iyochi's point card</title>
      </Head>
      <div class="flex flex-col items-center bg-red-50 min-h-[100vh]">
        <PointCard subtitle="Rank 1" points={4} max={10} />
        <PointCard subtitle="Rank 2" points={7} max={12} row={4} />
        <PointCard subtitle="Rank 2" points={7} max={12} />
        <PointCard subtitle="Rank 2" points={7} max={12} row={6} />
      </div>
    </>
  );
}
