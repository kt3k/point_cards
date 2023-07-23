// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import {
  getUserBySessionId,
  listPointCardsByHolderId,
  PointCard,
  User,
} from "utils/model.ts";
import PointCardUi from "components/PointCard.tsx";
import { Main } from "components/Containers.tsx";
import Header from "islands/Header.tsx";

type State = { user: User; cards: PointCard[] };
type Props = PageProps<State>;

export const handler: Handlers = {
  async GET(req, ctx) {
    const { session } = getCookies(req.headers);
    if (session) {
      const user = await getUserBySessionId(session);
      if (user) {
        const cards = await listPointCardsByHolderId(user.id);
        return ctx.render({
          user,
          cards,
        });
      }
    }
    return Response.redirect(
      Object.assign(new URL(req.url), { pathname: "/" }).href,
    );
  },
};

export default function Mypage(props: Props) {
  const { cards } = props.data;

  return (
    <>
      <Head>
        <title>Iyochi's point card</title>
      </Head>
      <Main>
        <Header />
        <div class="mt-5">
          {cards.map((card) => <PointCardUi card={card} />)}
        </div>
      </Main>
    </>
  );
}
