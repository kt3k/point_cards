// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { useState } from "preact/hooks";
import { PointCardSpec, User as UserFull } from "utils/model.ts";
import Button from "components/Button.tsx";

type User = Pick<UserFull, "id" | "name">;

export default function PointCardIssueControl(
  props: {
    class?: string;
    holder: User;
  },
) {
  const [loading, setLoading] = useState(false);
  const [subtitle, setSubtitle] = useState("Rank 1");
  const issue = async () => {
    setLoading(true);
    try {
      const spec: PointCardSpec = {
        max: 10,
        subtitle,
      };
      const resp = await fetch("/api/issue", {
        method: "POST",
        body: JSON.stringify({ holderId: props.holder.id, spec }),
      });
      const text = await resp.text();
      if (resp.ok) {
        alert(props.holder.name + "にポイントカードを発行しました");
      } else {
        throw new Error(text);
      }
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div class="mt-5 rounded-lg bg-gray-100 shadow p-6">
      <header class="font-medium text-gray-700">
        ポイントカード発行
      </header>
      <p class="mt-4 flex gap-2 items-center">
        <input
          onChange={(e) => setSubtitle(e.currentTarget.value)}
          class="px-2 py-1 rounded text-gray-700"
          placeholder="Rank 1"
          value={subtitle}
        />
        <span class="text-xs text-gray-500">
          カードの右上に<br />表示されます
        </span>
      </p>
      <p class="mt-3 text-gray-500">
        所有者
        <span class="ml-2">{props.holder.name}</span>
        <Button
          disabled={loading}
          onClick={issue}
          class="ml-2"
        >
          発行
        </Button>
      </p>
    </div>
  );
}
