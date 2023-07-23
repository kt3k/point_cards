// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { kv } from "utils/kv.ts";
import { digest } from "utils/digest.ts";
import { ulid } from "https://raw.githubusercontent.com/kt3k/ulid/v0.1.0/mod.ts";
import { getSessionById } from "./session.ts";

export interface User {
  id: string;
  login: string;
  name: string;
  cardSpecs: PointCardSpec[];
  pwDigest: string;
}

export interface PointCardSpec {
  max: number;
  subtitle: string;
  row?: number;
}

export const DEFAULT_POINT_CARD: PointCardSpec = {
  max: 10,
  subtitle: "Rank 1",
};

// Saved in 2 keys
// ["point_cards_by_issuer", issuerId, pointCardId]
// ["point_cards_by_holder", holderId, pointCardId]
export interface PointCard {
  id: string;
  spec: PointCardSpec;
  points: number;
  issuedAt: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
}

// User funcs

const USER_KEY_PREFIX = "users";
const USER_ID_BY_LOGIN = "user_id_by_login";

export async function getUserById(id: string) {
  const res = await kv.get<User>([USER_KEY_PREFIX, id]);
  return res.value;
}

export async function createUserByIdLoginNamePw(
  login: string,
  name: string,
  pw: string,
) {
  const user = {
    id: ulid(),
    login,
    name,
    pwDigest: await digest(pw),
    cardSpecs: [],
  };
  await saveUser(user);
  return user;
}

export async function getUserByLogin(login: string) {
  const { value: id } = await kv.get<string>([USER_ID_BY_LOGIN, login]);
  if (!id) {
    return null;
  }
  return getUserById(id);
}

export async function getUserBySessionId(sessionId: string) {
  const session = await getSessionById(sessionId);
  if (session) {
    return getUserById(session.userId);
  }
  return null;
}

export function saveUser(user: User) {
  return kv.atomic()
    .set([USER_KEY_PREFIX, user.id], user)
    .set([USER_ID_BY_LOGIN, user.login], user.id)
    .commit();
}

export async function listUsers() {
  const result: User[] = [];
  for await (const res of kv.list<User>({ prefix: [USER_KEY_PREFIX] })) {
    result.push(res.value);
  }
  return result;
}

// PointCard funcs

const POINT_CARD_BY_HOLDER_PREFIX = "point_cards_by_holder";
const POINT_CARD_BY_ISSUER_PREFIX = "point_cards_by_issuer";

function savePointCard(card: PointCard, issuer: User, holder: User) {
  return kv.atomic()
    .set([POINT_CARD_BY_HOLDER_PREFIX, holder.id, card.id], card)
    .set([POINT_CARD_BY_ISSUER_PREFIX, issuer.id, holder.id, card.id], card)
    .commit();
}

export async function addPoint(
  cardId: string,
  points: number,
  issuer: User,
  holder: User,
) {
  const get0 = kv.get<PointCard>([
    POINT_CARD_BY_HOLDER_PREFIX,
    holder.id,
    cardId,
  ]);
  const get1 = kv.get<PointCard>([
    POINT_CARD_BY_ISSUER_PREFIX,
    issuer.id,
    holder.id,
    cardId,
  ]);
  const [res0, res1] = await Promise.all([get0, get1]);
  const newCard = res0.value;
  if (!newCard) {
    throw new Error("Card not found");
  }
  if (newCard.points + points > newCard.spec.max) {
    throw new Error("Point overflow");
  }
  newCard.points += points;
  await kv.atomic().check(res0).check(res1)
    .set([POINT_CARD_BY_HOLDER_PREFIX, holder.id, cardId], newCard)
    .set([POINT_CARD_BY_ISSUER_PREFIX, issuer.id, holder.id, cardId], newCard)
    .commit();
  return newCard;
}

export async function issuePointCard(
  spec: PointCardSpec,
  issuer: User,
  holder: User,
) {
  const card = {
    id: ulid(),
    spec,
    points: 0,
    issuedAt: new Date(),
  };
  await savePointCard(card, issuer, holder);
  return card;
}

export async function listPointCardsByHolderId(holderId: string) {
  const result: PointCard[] = [];
  for await (
    const res of kv.list<PointCard>(
      { prefix: [POINT_CARD_BY_HOLDER_PREFIX, holderId] },
    )
  ) {
    result.push(res.value);
  }
  return result;
}

export async function listPointCardsByIssuerIdHolderId(
  issuerId: string,
  holderId: string,
) {
  const result: PointCard[] = [];
  for await (
    const res of kv.list<PointCard>(
      { prefix: [POINT_CARD_BY_ISSUER_PREFIX, issuerId, holderId] },
    )
  ) {
    result.push(res.value);
  }
  return result.toReversed();
}
