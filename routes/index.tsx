// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { Head } from "$fresh/runtime.ts";
import PointCard from "components/PointCard.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { getSessionById } from "utils/session.ts";
import { getUserById, User } from "utils/model.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { session } = getCookies(req.headers);
    const sess = await getSessionById(session);
    if (sess) {
      const user = await getUserById(sess.userId);
      if (user) {
        ctx.render({ user });
      }
    }
    return ctx.render();
  },
};
export default function Home(props: PageProps<{ user?: User }>) {
  return (
    <>
      <Head>
        <title>Iyochi's point card</title>
      </Head>
      <div class="flex flex-col items-center bg-red-50 min-h-[100vh]">
        <PointCard subtitle="Rank 1" points={4} max={10} />
        <PointCard subtitle="Rank 2" points={7} max={12} row={4} />
        <PointCard subtitle="Rank 3" points={7} max={12} />
        <PointCard subtitle="Rank 4" points={7} max={12} row={6} />
      </div>
    </>
  );
}
