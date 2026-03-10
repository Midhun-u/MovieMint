import type { ChangeEvent } from "react";

export function debounce<Type extends (event: ChangeEvent<HTMLInputElement>) => void>(
  fn: Type,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (event: ChangeEvent<HTMLInputElement>) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(event);
    }, delay);
  };
}