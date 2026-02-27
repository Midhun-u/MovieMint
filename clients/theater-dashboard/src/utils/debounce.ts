import type { ChangeEvent } from "react";

export function debounce<Type extends (event: ChangeEvent<HTMLInputElement>) => void>(
  fn: Type,
  delay: number,
) {
  return function (event: ChangeEvent<HTMLInputElement>) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(event);
    }, delay);
  };
}