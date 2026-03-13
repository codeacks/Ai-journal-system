import crypto from "node:crypto";

const analysisCache = new Map();

const CACHE_TTL_MS = Number.parseInt(process.env.CACHE_TTL_MS || "86400000", 10);

function now() {
  return Date.now();
}

export function getTextHash(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export function getCachedAnalysis(hash) {
  const item = analysisCache.get(hash);
  if (!item) return null;

  if (item.expiresAt <= now()) {
    analysisCache.delete(hash);
    return null;
  }

  return item.value;
}

export function setCachedAnalysis(hash, value, ttlMs = CACHE_TTL_MS) {
  analysisCache.set(hash, {
    value,
    expiresAt: now() + ttlMs,
  });
}

