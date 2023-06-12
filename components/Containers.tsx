// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { type ComponentChildren } from "preact";
export function Main(props: { children?: ComponentChildren }) {
  return (
    <div class="flex flex-col items-center bg-red-50 min-h-[100vh]">
      <div class="max-w-[400px] w-full px-2 min-h-[100vh]">
        {props.children}
      </div>
    </div>
  );
}
