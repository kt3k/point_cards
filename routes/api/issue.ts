// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { Handlers } from "$fresh/server.ts";
import {
  getUserById,
  getUserBySessionId,
  issuePointCard,
} from "utils/model.ts";
import { getCookies } from "std/http/cookie.ts";

export const handler: Handlers = {
  async POST(req, _) {
    const body = await req.json();
    const holderId = body.holderId;
    const spec = body.spec;
    const { session } = getCookies(req.headers);
    const user = await getUserBySessionId(session);
    console.log("Issue");
    if (!user) {
      return new Response("{}", { status: 401 });
    }
    const holder = await getUserById(holderId);
    if (!holder) {
      return new Response("{}", { status: 401 });
    }
    const card = await issuePointCard(spec, user, holder);
    return Response.json(card);
  },
};
