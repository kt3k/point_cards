// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { kv } from "utils/kv.ts";
import { digest } from "utils/digest.ts";
import { ulid } from "https://raw.githubusercontent.com/kt3k/ulid/v0.1.0/mod.ts";

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

export function saveUser(user: User) {
  return kv.atomic()
    .set([USER_KEY_PREFIX, user.id], user)
    .set([USER_ID_BY_LOGIN, user.login], user.id)
    .commit();
}

// PointCard funcs

function savePointCard(card: PointCard, issuer: User, holder: User) {
  return kv.atomic()
    .set(["point_cards_by_holder", holder.id, card.id], card)
    .set(["point_cards_by_issuer", issuer.id, card.id], card)
    .commit();
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
