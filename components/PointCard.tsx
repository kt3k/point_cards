// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { PointCard } from "utils/model.ts";

export default function PointCard(
  props: { card: PointCard; class?: string },
) {
  const { card } = props;
  const {
    points,
    spec: {
      max,
      row,
      subtitle,
    },
    issuedAt,
  } = card;
  return (
    <div
      class={"w-[340px] bg-red-100 shadow-lg rounded-lg overflow-hidden relative " +
          props.class ?? ""}
    >
      <header class="px-4 py-3 bg-red-700 flex items-center gap-2">
        <img
          src="/logo.svg"
          class="w-7 h-7"
        />
        <span
          class="text-lg font-bold text-red-100"
          style="font-family: 'Comic Sans MS'"
        >
          iyochi's Point Card
        </span>
        <span class="flex-1 text-right text-red-50 text-xs font-thin">
          {subtitle}
        </span>
      </header>
      <div
        class={`px-2 pt-8 pb-5 grid grid-cols-${
          row ?? 5
        } gap-5 place-items-center relative`}
      >
        <div
          class="absolute w-full top-1 px-2 text-red-800 font-thin text-right"
          style="font-size: 11px;"
        >
          発行日: {issuedAt.toLocaleDateString("ja", { dateStyle: "long" })}
        </div>
        {[...Array(points)].map((_, i) => 
        <Heart class="w-7 h-7 text-red-500" />)}
        {[...Array(max - points - 1)].map((_, i) => (
          <HeartPlaceholder class="w-7 h-7 text-red-800" />
        ))}
        <div>
          <HeartPlaceholder class="w-7 h-7 text-red-800" />
          <span class="-mt-1 text-xs text-red-800 absolute">Goal</span>
        </div>
      </div>
    </div>
  );
}

function Heart(props: { class: string }) {
  return (
    <svg
      width="630px"
      height="562.003197px"
      viewBox="0 0 630 562.003197"
      class={props.class}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Path 2</title>
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g
          id="Artboard"
          transform="translate(-33.000000, -44.998798)"
          fill="currentColor"
          fill-rule="nonzero"
        >
          <g id="Path-2" transform="translate(33.000000, 44.998798)">
            <path
              d="M137.860598,1.70946606 C174.827754,-3.61750105 213.508354,3.57716199 247.270688,22.2870325 C274.399939,37.3210867 297.393774,59.1803639 314.460702,86.6281616 L315,87.5012022 L315.539298,86.6281616 C332.381661,59.5415191 354.995986,37.8972983 381.660572,22.8840241 L382.729312,22.2870325 C416.491646,3.57716199 455.172246,-3.61750105 492.139402,1.70946606 C530.166494,7.18917008 564.321322,25.5774822 588.978751,54.8894712 C615.573494,86.5044805 630,129.251232 630,180.330197 C630,230.363875 612.658706,280.461266 580.742726,330.109001 C554.143721,371.485777 518.100729,411.534315 474.965593,449.877592 C441.591346,479.544312 405.893524,506.516781 370.195693,530.316122 C357.696498,538.649194 346.08022,545.996498 335.638231,552.295072 C331.967542,554.50922 328.700483,556.436982 325.873521,558.070401 C324.151722,559.065256 322.94334,559.749599 322.284867,560.115433 C317.754413,562.632452 312.245587,562.632452 307.715133,560.115433 C307.05666,559.749599 305.848278,559.065256 304.126479,558.070401 C301.299517,556.436982 298.032458,554.50922 294.361769,552.295072 C283.91978,545.996498 272.303502,538.649194 259.804307,530.316122 C224.106476,506.516781 188.408654,479.544312 155.034407,449.877592 C111.899271,411.534315 75.8562788,371.485777 49.2572741,330.109001 C17.3412944,280.461266 0,230.363875 0,180.330197 C0,129.251232 14.4265055,86.5044805 41.0212492,54.8894712 C65.6786779,25.5774822 99.8335055,7.18917008 137.860598,1.70946606 Z"
              id="Path"
            >
            </path>
          </g>
        </g>
      </g>
    </svg>
  );
}

function HeartPlaceholder(props: { class: string }) {
  return (
    <svg
      class={props.class}
      width="629.275389px"
      height="558.194406px"
      viewBox="0 0 629.275389 558.194406"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Vector 2</title>
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
        stroke-dasharray="0,63"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <g
          id="Artboard"
          transform="translate(-33.031679, -45.194248)"
          stroke="currentColor"
          stroke-width="30"
        >
          <g id="Vector-2" transform="translate(48.000000, 60.000000)">
            <path
              d="M300,105.142329 C233.333333,-51.3386714 0,-34.6720047 0,165.328995 C0,365.328662 300,532.001995 300,532.001995 C300,532.001995 600,365.328662 600,165.328995 C600,-34.6720047 366.666667,-51.3386714 300,105.142329 Z"
              id="Vector"
            >
            </path>
          </g>
        </g>
      </g>
    </svg>
  );
}
