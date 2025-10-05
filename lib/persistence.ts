export type StoredView = "intro" | "test" | "results";

const VIEW_KEY = "delfos-view";

export function saveView(view: StoredView) {
  try {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(VIEW_KEY, view);
    }
  } catch {}
}

export function loadView(): StoredView | null {
  try {
    if (typeof window !== "undefined") {
      const v = sessionStorage.getItem(VIEW_KEY) as StoredView | null;
      return v ?? null;
    }
  } catch {}
  return null;
}

export function clearView() {
  try {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(VIEW_KEY);
    }
  } catch {}
}
