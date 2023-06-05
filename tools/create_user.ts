#!/usr/bin/env -S deno run --unstable
// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { createUserByIdLoginNamePw } from "utils/model.ts";

function usage() {
  console.log(`Usage: ./tools/create_user.ts <id> <login> <name> <pw>`);
}

const [login, name, pw] = Deno.args;

if (!login || !name || !pw) {
  usage();
  Deno.exit(1);
}

const user = await createUserByIdLoginNamePw(login, name, pw);

console.log("Success!");
console.log(
  `Created user id=${user.id} login=${user.login} name="${user.name}"`,
);
