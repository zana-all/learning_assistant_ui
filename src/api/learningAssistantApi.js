import { postJson, getJson } from "./client";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";


export async function generateImage({ prompt }) {
  return postJson(`${API_BASE}/v1/image`, { prompt });
}


export function getApiBase() {
  return API_BASE;
}

export async function generateLesson({ year_group, subject, topic_idea, liverun }) {
  return postJson(`${API_BASE}/v1/lesson`, {
    year_group,
    subject,
    topic_idea: topic_idea || "",
    liverun: Boolean(liverun),
  });
}

export async function generateQuiz({ lesson_text, year_group, liverun }) {
  return postJson(`${API_BASE}/v1/quiz`, {
    lesson_text,
    year_group,
    liverun: Boolean(liverun),
  });
}

export async function postScore({
  subject,
  year_group,
  topic,
  score,
  total_questions,
}) {
  return postJson(`${API_BASE}/scores`, {
    subject,
    year_group,
    topic: topic || null,
    score,
    total_questions,
  });
}

export async function getScoreSummary() {
  return getJson(`${API_BASE}/scores/summary`);
}


