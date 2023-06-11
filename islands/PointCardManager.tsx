// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import PointCard from "components/PointCard.tsx";
import Button from "components/Button.tsx";
import { PointCard as PointCardModel } from "utils/model.ts";

export default function PointCardManager(
  props: { class?: string; card: PointCardModel; holderName: string },
) {
  return (
    <div class={"p-6 rounded shadow bg-gray-100 " + (props.class ?? "")}>
      <PointCard card={props.card} />
      <p class="mt-4">所有者: {props.holderName}</p>
      <p class="mt-4">
        <Button style="red">ポイント付与 +1</Button>
        <Button style="red">ポイント付与 +2</Button>
      </p>
    </div>
  );
}
