// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { getUserBySessionId, listUsers, User } from "utils/model.ts";
import Login from "islands/Login.tsx";
import { Main } from "components/Containers.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { session } = getCookies(req.headers);
    if (session) {
      const user = await getUserBySessionId(session);
      if (user) {
        const users = (await listUsers()).filter((u) => u.id !== user.id);
        return ctx.render({
          user,
          users,
        });
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
        <div class="mt-5 font-thin text-xl text-red-600">
          <span style="font-family: 'Comic Sans MS'">iyochi's</span>{" "}
          ポイントカード管理
        </div>
        <div class="mt-5">
          <header class="font-medium">カード所有者選択</header>
          {users.map((u) => (
            <a href={"/manage/" + u.id}>
              <p class="mt-3 w-full text-center rounded-lg shadow bg-gray-100 py-1">
                {u.name}
              </p>
            </a>
          ))}
        </div>
      </Main>
    </>
  );
}
