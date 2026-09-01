const DISMISSED_UNTIL_KEY = "seasilk:newsletter-popup:dismissed-until";
const SUBSCRIBED_KEY = "seasilk:newsletter-popup:subscribed";
const DISMISS_DAYS = 6;

/** localStorage can throw (private browsing, disabled storage); fail safe. */
function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore — worst case the popup shows again next visit.
  }
}

export function hasSubscribed(): boolean {
  return safeGet(SUBSCRIBED_KEY) === "true";
}

export function markSubscribed() {
  safeSet(SUBSCRIBED_KEY, "true");
}

export function isDismissed(): boolean {
  const until = safeGet(DISMISSED_UNTIL_KEY);
  if (!until) return false;
  return Date.now() < Number(until);
}

export function markDismissed() {
  const until = Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000;
  safeSet(DISMISSED_UNTIL_KEY, String(until));
}
