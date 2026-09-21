"use client";

import { useSyncExternalStore } from "react";

export interface CartItem {
  productId: string;
  quantity: number;
}
const KEY = "seasilk:shopping-bag:v1";
const EVENT = "seasilk:bag-change";
let memory = "[]";
let storageAvailable = true;
let cachedRaw = "[]";
let cachedItems: CartItem[] = [];
const empty: CartItem[] = [];

function snapshot(): CartItem[] {
  let raw = memory;
  try {
    if (storageAvailable) raw = localStorage.getItem(KEY) ?? "[]";
  } catch {
    storageAvailable = false;
    /* In-memory bag when storage is unavailable. */
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      const parsed: unknown = JSON.parse(raw);
      const seen = new Set<string>();
      cachedItems = Array.isArray(parsed)
        ? parsed.filter((item): item is CartItem => {
            if (
              !item ||
              typeof item.productId !== "string" ||
              seen.has(item.productId) ||
              !Number.isInteger(item.quantity) ||
              item.quantity < 1 ||
              item.quantity > 99
            )
              return false;
            seen.add(item.productId);
            return true;
          })
        : [];
    } catch {
      cachedItems = [];
    }
  }
  return cachedItems;
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}
function write(items: CartItem[]) {
  memory = JSON.stringify(items);
  try {
    localStorage.setItem(KEY, memory);
  } catch {
    storageAvailable = false;
    /* Bag stays usable in this tab. */
  }
  window.dispatchEvent(new Event(EVENT));
}
export function addToCart(productId: string, quantity: number) {
  const items = snapshot();
  const existing = items.find((item) => item.productId === productId);
  write(
    existing
      ? items.map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.min(99, item.quantity + quantity) }
            : item,
        )
      : [
          ...items,
          { productId, quantity: Math.min(99, Math.max(1, quantity)) },
        ],
  );
}
export function setCartQuantity(productId: string, quantity: number) {
  write(
    snapshot().flatMap((item) =>
      item.productId !== productId
        ? [item]
        : quantity <= 0
          ? []
          : [{ ...item, quantity: Math.min(99, quantity) }],
    ),
  );
}
export function useCart() {
  return useSyncExternalStore(subscribe, snapshot, () => empty);
}
