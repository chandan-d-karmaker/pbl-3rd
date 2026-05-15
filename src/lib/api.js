const BASE_URL = "https://openapi.programming-hero.com/api";

export async function fetchLevels() {
  const res = await fetch(`${BASE_URL}/levels/all`);
  if (!res.ok) throw new Error("Failed to load lessons");
  const json = await res.json();
  return json.data;
}

export async function fetchWordsByLevel(levelId) {
  const res = await fetch(`${BASE_URL}/level/${levelId}`);
  if (!res.ok) throw new Error("Failed to load words");
  const json = await res.json();
  return json.data;
}

export async function fetchWordDetails(wordId) {
  const res = await fetch(`${BASE_URL}/word/${wordId}`);
  if (!res.ok) throw new Error("Failed to load word details");
  const json = await res.json();
  return json.data;
}

export async function fetchAllWords() {
  const res = await fetch(`${BASE_URL}/words/all`);
  if (!res.ok) throw new Error("Failed to load words");
  const json = await res.json();
  return json.data;
}

export function pronounceWord(word) {
  if (typeof window === "undefined" || !word) return;
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}
