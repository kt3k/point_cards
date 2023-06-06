// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { getUserBySessionId, listUsers, User } from "utils/model.ts";
import Login from "islands/Login.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { session } = getCookies(req.headers);
    if (session) {
      const user = await getUserBySessionId(session);
      if (user) {
        const users = await listUsers();
        return ctx.render({
          user,
          users: users.filter((u) => u.id !== user.id),
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
        <Login class="mt-10 max-w-[200px] w-4/5 min-h-[100vh]" />
      </div>
    );
  }

  const { user, users } = props.data;

  return (
    <>
      <Head>
        <title>Iyochi's point card</title>
      </Head>
      <div class="flex flex-col items-center bg-red-50 min-h-[100vh]">
        <div class="max-w-[400px] w-4/5 min-h-[100vh]">
          <div class="mt-5 font-thin px-5 text-xl text-red-600">
            <span style="font-family: 'Comic Sans MS'">iyochi's</span>{" "}
            ポイントカード管理画面
          </div>
          <div class="mt-5 rounded bg-gray-200 p-6">
            <header class="font-medium">
              ポイントカード発行
            </header>
            <p class="mt-4 flex gap-2 items-center">
              <input
                class="px-2 py-1 rounded"
                placeholder="Rank 1"
                value="Rank 1"
              />
              <span class="text-xs text-gray-500">
                カードの右上に表示されます
              </span>
            </p>
            <p class="">
              所有者
              <select class="m-1 p-1 rounded">
                {users.map((u) => <option>{u.name}</option>)}
              </select>
              <button class="m-1 py-0.5 px-4 rounded bg-blue-500 text-white font-semibold">
                発行
              </button>
            </p>
          </div>
          <div class="mt-5 rounded bg-gray-200 p-6">
            <header class="font-medium">
              発行済みポイントカード一覧
            </header>
            <p class="mt-4 ">
              発行済みのポイントカードはこちらに表示されます。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
