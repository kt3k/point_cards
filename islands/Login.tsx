// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { useState } from "preact/hooks";

export default function Login(props: { class?: string }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const disabled = !id || !pw;
  const login = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ login: id, pw }),
      });
      const text = await res.text();
      if (res.ok) {
        location.reload();
      } else if (res.status === 400) {
        alert("IDかパスワードが違います");
      } else {
        throw new Error(`${res.status}\n${text}`);
      }
    } catch (e) {
      alert("エラー😭 パパに連絡してね\n" + e.message);
    }
  };
  return (
    <div class={props.class}>
      <header class="text-center pb-10">
        <img
          src="/14logo.svg"
          class="w-20 h-20 inline rounded-full bg-red-50 border border-red-200"
        />
        <p class="mt-5">Iyochi's ポイントカード</p>
      </header>
      <p>
        <input
          class="w-full px-2 py-1 rounded border"
          onInput={(e) => setId(e.currentTarget.value)}
          placeholder="ID"
        />
      </p>
      <p>
        <input
          class="mt-2 w-full px-2 py-1 rounded border"
          onInput={(e) => setPw(e.currentTarget.value)}
          placeholder="パスワード"
        />
      </p>
      <button
        onClick={login}
        disabled={disabled}
        class={`mt-4 w-full py-1 rounded ${
          disabled ? "bg-gray-500" : "bg-blue-500"
        } text-white font-semibold transition`}
      >
        ログイン
      </button>
    </div>
  );
}
