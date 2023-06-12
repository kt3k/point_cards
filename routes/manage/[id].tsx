// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import {
  getUserById,
  getUserBySessionId,
  listPointCardsByIssuerIdHolderId,
  PointCard,
  User,
} from "utils/model.ts";
import PointCardIssueControl from "islands/PointCardIssueControl.tsx";
import PointCardManager from "islands/PointCardManager.tsx";
import { Main } from "components/Containers.tsx";

function redirectToTop() {
  return new Response("", { status: 302, headers: { "Location": `/` } });
}

export const handler: Handlers = {
  async GET(req, ctx) {
    const { session } = getCookies(req.headers);
    if (!session) {
      return redirectToTop();
    }
    const user = await getUserBySessionId(session);
    const holderId = ctx.params.id;
    if (!user) {
      return redirectToTop();
    }
    const holder = await getUserById(holderId);
    if (!holder) {
      return redirectToTop();
    }
    return ctx.render({
      user,
      holder,
      pointCards: await listPointCardsByIssuerIdHolderId(
        user.id,
        holder.id,
      ),
    });
  },
};
export default function Home(
  props: PageProps<
    { user: User; holder: User; users: User[]; pointCards: PointCard[] }
  >,
) {
  const { holder, pointCards } = props.data;

  return (
    <>
      <Head>
        <title>Iyochi's point card</title>
      </Head>
      <Main>
        <div class="mt-5 font-thin text-xl text-red-600">
          <span class="font-bold" style="font-family: 'Comic Sans MS'">
            iyochi's
          </span>{" "}
          ポイントカード管理
        </div>
        <p class="mt-5">
          <a
            href="/"
            class="text-gray-500 rounded-lg shadow px-4 py-1 bg-gray-100 hover:underline"
          >
            戻る
          </a>
        </p>
        <PointCardIssueControl
          class="mt-5 rounded bg-gray-200 p-6"
          holder={holder}
        />
        <div class="mt-10 rounded">
          <header class="font-medium text-gray-700">
            発行済みポイントカード ({pointCards.length})
          </header>
          <p class="mt-4 ">
            {pointCards.map((card) => (
              <PointCardManager
                class="mt-5"
                card={card}
                holderName={holder.name}
              />
            ))}
          </p>
        </div>
      </Main>
    </>
  );
}
