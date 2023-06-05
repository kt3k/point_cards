// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { kv } from "utils/kv.ts";
import { DAY } from "utils/datetime.ts";

export interface Session {
  id: string;
  expiresAt: Date;
  userId: string;
}

const SESSION_KEY_PREFIX = "sessions";

export async function getSessionById(id: string) {
  const res = await kv.get<Session>([SESSION_KEY_PREFIX, id]);
  return res.value;
}

export async function createAndSaveSession(userId: string) {
  const session = {
    id: crypto.randomUUID(),
    expiresAt: new Date(Date.now() + DAY * 30),
    userId,
  };
  await saveSession(session);
  return session;
}

async function saveSession(session: Session) {
  await kv.set([SESSION_KEY_PREFIX, session.id], session);
}
