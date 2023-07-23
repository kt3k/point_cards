// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { useState } from "preact/hooks";
import PointCard from "components/PointCard.tsx";
import Button from "components/Button.tsx";
import { PointCard as PointCardModel, User } from "utils/model.ts";

export default function PointCardManager(
  props: {
    class?: string;
    card: PointCardModel;
    holder: Pick<User, "id" | "name">;
  },
) {
  const [card, setCard] = useState(props.card);
  const [loading, setLoading] = useState(false);
  const addPoints = async (points: number) => {
    setLoading(true);
    try {
      const res = await fetch("/api/add_points", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          holderId: props.holder.id,
          cardId: props.card.id,
          points,
        }),
      });
      const text = await res.text();
      if (res.ok) {
        setCard(JSON.parse(text));
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
    <div
      class={props.class ?? ""}
    >
      <PointCard card={card} />
      <div class="-mt-6 pt-6 pb-4 px-4 mx-4 rounded-lg shadow bg-gray-100">
        <p class="mt-4 text-gray-500">所有者: {props.holder.name}</p>
        <p class="mt-4 text-gray-500">
          ポイント付与{" "}
          <Button
            disabled={loading || card.spec.max < card.points + 1}
            onClick={() => addPoints(1)}
            style="red"
          >
            +1
          </Button>
          <Button
            disabled={loading || card.spec.max < card.points + 2}
            onClick={() => addPoints(2)}
            style="red"
          >
            +2
          </Button>
          <Button
            disabled={loading || card.spec.max < card.points + 3}
            onClick={() => addPoints(3)}
            style="red"
          >
            +3
          </Button>
        </p>
      </div>
    </div>
  );
}
