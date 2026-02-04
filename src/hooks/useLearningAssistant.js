import { useEffect, useMemo, useState } from "react";
import {
  generateLesson,
  generateQuiz,
  generateImage,
  getApiBase,
  getScoreSummary,
} from "../api/learningAssistantApi";
import { normaliseQuiz } from "../utils/normaliseQuiz";

const defaultForm = {
  year_group: null,
  subject: "",
  topic_idea: "",
  liverun: false,
};

export function useLearningAssistant() {
  const apiBase = useMemo(() => getApiBase(), []);

  const [settingsOpen, setSettingsOpen] = useState(true);
  const [form, setForm] = useState(defaultForm);

  const [lessonText, setLessonText] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [visualPrompt, setVisualPrompt] = useState("");

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [loadingLesson, setLoadingLesson] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  const [error, setError] = useState("");

  const [imageBase64, setImageBase64] = useState("");
  const [imageStatus, setImageStatus] = useState("idle"); // idle | loading | success | failed

  const [lessonOpen, setLessonOpen] = useState(true);
  const [quizOpen, setQuizOpen] = useState(false);

  const [statsOpen, setStatsOpen] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState("");
  const [statsSummary, setStatsSummary] = useState(null);

  const canGenerateLesson = Number(form.year_group) && form.subject.trim();
  const canGenerateQuiz = lessonText.trim().length > 0;

  function updateForm(patch) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function resetQuizState() {
    setQuiz(null);
    setAnswers({});
    setSubmitted(false);
  }

  function setAnswer(index, option) {
    setAnswers((prev) => ({ ...prev, [index]: option }));
  }

  function onResetAll() {
    setForm(defaultForm);
    setLessonText("");
    setLessonTitle("");
    setVisualPrompt("");
    setImageBase64("");
    setImageStatus("idle");
    resetQuizState();
    setError("");
    setSettingsOpen(true);
    setLessonOpen(true);
    setQuizOpen(false);
  }

  async function onGenerateLesson() {
    setError("");
    setLoadingLesson(true);

    try {
      resetQuizState();
      setLessonText("");
      setLessonTitle("");
      setVisualPrompt("");
      setImageBase64("");
      setImageStatus("idle");

      const data = await generateLesson({
        year_group: Number(form.year_group),
        subject: form.subject.trim(),
        topic_idea: form.topic_idea.trim(),
        liverun: form.liverun,
      });

      setLessonText(data.lesson_text || "");
      setVisualPrompt(data.visual_prompt || "");
      setLessonTitle(data.title || "");

      setSettingsOpen(false);
      setLessonOpen(true);
      setQuizOpen(false);
    } catch (e) {
      setError(e.message || "Failed to generate lesson");
    } finally {
      setLoadingLesson(false);
    }
  }

  async function onGenerateQuiz() {
    setError("");
    setLoadingQuiz(true);

    try {
      resetQuizState();

      const data = await generateQuiz({
        lesson_text: lessonText,
        year_group: Number(form.year_group),
        liverun: form.liverun,
      });

      setQuiz(normaliseQuiz(data));
      setQuizOpen(true);
      setLessonOpen(false);

      requestAnimationFrame(() => {
        document.getElementById("quiz-panel")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } catch (e) {
      setError(e.message || "Failed to generate quiz");
    } finally {
      setLoadingQuiz(false);
    }
  }

  async function onOpenStats() {
    setStatsOpen(true);
    setStatsError("");
    setStatsLoading(true);

    try {
      const data = await getScoreSummary();
      setStatsSummary(data);
    } catch (e) {
      setStatsError(e.message || "Failed to load stats");
      setStatsSummary(null);
    } finally {
      setStatsLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function autoGenerate() {
      if (!visualPrompt) return;
      if (imageBase64) return;

      setImageStatus("loading");

      try {
        const res = await generateImage({ prompt: visualPrompt });
        if (cancelled) return;

        if (res?.image_base64) {
          setImageBase64(res.image_base64);
          setImageStatus("success");
        } else {
          setImageStatus("failed");
        }
      } catch (e) {
        if (cancelled) return;
        setImageStatus("failed");
        setError(e.message || "Failed to generate image");
      }
    }

    autoGenerate();

    return () => {
      cancelled = true;
    };
  }, [visualPrompt]);

  return {
    apiBase,

    // state
    settingsOpen,
    form,
    lessonText,
    lessonTitle,
    quiz,
    answers,
    submitted,
    loadingLesson,
    loadingQuiz,
    error,
    imageBase64,
    imageStatus,
    lessonOpen,
    quizOpen,
    statsOpen,
    statsLoading,
    statsError,
    statsSummary,

    // derived
    canGenerateLesson,
    canGenerateQuiz,

    // actions
    setSettingsOpen,
    updateForm,
    onGenerateLesson,
    onGenerateQuiz,
    setAnswer,
    setSubmitted,
    onResetAll,
    setLessonOpen,
    setQuizOpen,
    onOpenStats,
    setStatsOpen,
  };
}
