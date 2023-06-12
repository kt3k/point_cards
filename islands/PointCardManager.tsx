// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import PointCard from "components/PointCard.tsx";
import Button from "components/Button.tsx";
import { PointCard as PointCardModel } from "utils/model.ts";

export default function PointCardManager(
  props: { class?: string; card: PointCardModel; holderName: string },
) {
  return (
    <div
      class={"" +
        (props.class ?? "")}
    >
      <PointCard card={props.card} />
      <div class="-mt-6 pt-6 pb-4 px-4 mx-4 rounded-lg shadow bg-gray-100">
        <p class="mt-4">所有者: {props.holderName}</p>
        <p class="mt-4">
          ポイント付与 <Button style="red">+1</Button>
          <Button style="red">+2</Button>
          <Button style="red">+3</Button>
        </p>
      </div>
    </div>
  );
}
