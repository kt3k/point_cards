// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  POST(_req, _) {
    return new Response("", {
      headers: {
        "Set-Cookie":
          `session=deleted; path=/; SameSate=Lax; Secure; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      },
    });
  },
};
