// Persistent Image Storage using IndexedDB (no 5MB storage limit) + API sync
const DB_NAME = "portfolio_aurora_store";
const DB_VERSION = 1;
const STORE_NAME = "wallpapers";
const BG_KEY = "some_bits_bg_image";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB not available"));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveAuroraImage(dataUrl: string): Promise<boolean> {
  try {
    // 1. Save in IndexedDB (handles large multi-MB images effortlessly)
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, BG_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });

    // 2. Also try localStorage for quick synchronous initial read
    try {
      localStorage.setItem(BG_KEY, dataUrl);
    } catch {
      // Ignored if file exceeds 5MB
    }

    // 3. Post to dev server to persist as public/aurora.jpg on disk
    try {
      await fetch("/api/save-aurora", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataUrl }),
      });
    } catch {
      // Server-side write is progressive enhancement
    }

    return true;
  } catch (err) {
    console.warn("Failed to persist image to IndexedDB:", err);
    return false;
  }
}

export async function getAuroraImage(): Promise<string | null> {
  // First check localStorage
  try {
    const local = localStorage.getItem(BG_KEY);
    if (local) return local;
  } catch {
    // fallback
  }

  // Then check IndexedDB
  try {
    const db = await openDB();
    return await new Promise<string | null>((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(BG_KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function clearAuroraImage(): Promise<void> {
  try {
    localStorage.removeItem(BG_KEY);
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(BG_KEY);
  } catch {
    // ignore
  }
}
