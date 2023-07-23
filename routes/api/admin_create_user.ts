// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { Handlers } from "$fresh/server.ts";
import { createUserByIdLoginNamePw } from "utils/model.ts";

const ADMIN_KEY = Deno.env.get("ADMIN_KEY");

export const handler: Handlers = {
  async POST(req, _) {
    if (req.headers.get("X-Admin-Key") !== ADMIN_KEY) {
      return new Response("{}", { status: 401 });
    }

    const { login, name, pw } = await req.json();
    const user = await createUserByIdLoginNamePw(login, name, pw);
    return Response.json(user);
  },
};
