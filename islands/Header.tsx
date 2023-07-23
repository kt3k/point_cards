// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

export default function Header() {
  const logout = async () => {
    const resp = await fetch("/api/logout", { method: "POST" });
    const _body = await resp.text();
    location.href = "/";
  };
  return (
    <div class="mt-5  flex justify-between items-center">
      <span class="text-xl text-red-700">
        <span class="font-bold" style="font-family: 'Comic Sans MS'">
          iyochi's
        </span>{" "}
        ポイントカード
      </span>
      <button
        class="py-1 px-2 rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-100"
        onClick={logout}
        href="/logout"
      >
        ログアウト
      </button>
    </div>
  );
}
