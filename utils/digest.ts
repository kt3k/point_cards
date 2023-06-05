// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

export async function digest(input: string) {
  return Array.prototype.map.call(
    new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(input),
      ),
    ),
    (byte) => byte.toString(16).padStart(2, "0"),
  ).join("");
}
