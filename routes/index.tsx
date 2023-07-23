// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { getUserBySessionId, listUsers, User } from "utils/model.ts";
import Login from "islands/Login.tsx";
import { Main } from "components/Containers.tsx";
import Header from "islands/Header.tsx";

const admins = new Set(Deno.env.get("ADMIN")?.split(",") || []);

export const handler: Handlers = {
  async GET(req, ctx) {
    const { session } = getCookies(req.headers);
    if (session) {
      const user = await getUserBySessionId(session);
      if (user) {
        if (admins.has(user.login)) {
          if (user) {
            const users = (await listUsers()).filter((u) => u.id !== user.id);
            return ctx.render({
              user,
              users,
            });
          }
        }
        return Response.redirect(
          Object.assign(new URL(req.url), { pathname: "/mypage" }),
        );
      }
    }
    return ctx.render({});
  },
};
export default function Home(props: PageProps<{ user?: User; users: User[] }>) {
  if (!props.data.user) {
    return (
      <div class="flex flex-col items-center bg-red-50 min-h-[100vh]">
        <Login class="mt-10 w-[200px] min-h-[100vh]" />
      </div>
    );
  }

  const { users } = props.data;

  return (
    <>
      <Head>
        <title>Iyochi's point card</title>
      </Head>
      <Main>
        <Header />
        <div class="mt-5">
          <header class="font-medium text-gray-700">カード所有者選択</header>
          {users.map((u) => (
            <a href={"/manage/" + u.id}>
              <p class="mt-3 w-full text-center rounded-lg shadow text-gray-500 bg-gray-100 py-1">
                {u.name}
              </p>
            </a>
          ))}
        </div>
      </Main>
    </>
  );
}
