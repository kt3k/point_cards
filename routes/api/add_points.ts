// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { Handlers } from "$fresh/server.ts";
import { addPoint, getUserById, getUserBySessionId } from "utils/model.ts";
import { getCookies } from "std/http/cookie.ts";

export const handler: Handlers = {
  async PATCH(req, _) {
    const text = await req.text();
    console.log(text);
    const body = JSON.parse(text);
    const holderId = body.holderId;
    const cardId = body.cardId;
    const points = body.points;
    const { session } = getCookies(req.headers);
    const user = await getUserBySessionId(session);
    if (!user) {
      return new Response("{}", { status: 401 });
    }
    const holder = await getUserById(holderId);
    if (!holder) {
      return new Response("{}", { status: 401 });
    }
    try {
      const card = await addPoint(cardId, points, user, holder);
      return Response.json(card);
    } catch (e) {
      return new Response(e.message, { status: 400 });
    }
  },
};
