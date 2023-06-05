// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { Handlers } from "$fresh/server.ts";
import { digest } from "utils/digest.ts";
import { getUserByLogin } from "utils/model.ts";
import { createAndSaveSession } from "utils/session.ts";

export const handler: Handlers = {
  async POST(req, _) {
    const body = await req.json();
    const login = body.login;
    if (!login) {
      return new Response("{}", { status: 400 });
    }
    const user = await getUserByLogin(login);
    if (!user) {
      return new Response("{}", { status: 400 });
    }
    const pwDigest = await digest(body.pw);
    if (pwDigest !== user.pwDigest) {
      return new Response("{}", { status: 400 });
    }
    const session = await createAndSaveSession(user.id);
    return new Response("", {
      headers: {
        "Set-Cookie":
          `session=${session.id}; path=/; SameSate=Lax; Secure; HttpOnly`,
      },
    });
  },
};
