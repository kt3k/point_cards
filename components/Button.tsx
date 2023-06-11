import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function Button(
  props: JSX.HTMLAttributes<HTMLButtonElement> & { style?: string },
) {
  let cls = "m-1 py-0.5 px-4 rounded font-semibold " +
    (props.class ?? "");
  if (props.style === "red") {
    cls += "bg-red-600 text-white ";
  } else {
    cls += "bg-blue-600 text-white ";
  }
  if (props.disabled) {
    cls += "hover:opacity-40 opacity-50 cursor-not-allowed ";
  } else {
    cls += "hover:opacity-80 ";
  }
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={cls}
    />
  );
}
