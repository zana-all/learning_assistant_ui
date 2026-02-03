import { useLearningAssistant } from "./hooks/useLearningAssistant";

import SettingsForm from "./components/SettingsForm";
import SettingsModal from "./components/SettingsModal";
import LessonPanel from "./components/LessonPanel";
import QuizPanel from "./components/QuizPanel";
import ErrorBanner from "./components/ErrorBanner";
import StatsModal from "./components/StatsModal";

export default function App() {
  const s = useLearningAssistant();

  return (
    <div style={{ maxWidth: 980, margin: "40px auto", padding: 16, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      <h1 style={{ marginBottom: 6 }}>Learning Assistant</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Generate a lesson and an interactive quiz based on year group and subject.
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        {s.lessonText ? (
          <button
            onClick={s.onResetAll}
            style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #ccc", cursor: "pointer", opacity: 0.85 }}
          >
            New lesson
          </button>
        ) : null}

        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={s.onOpenStats}
            style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #ccc", cursor: "pointer", opacity: 0.9 }}
          >
            View stats
          </button>
        </div>
      </div>

      <SettingsModal
        open={s.settingsOpen}
        onClose={() => s.setSettingsOpen(false)}
        title="Lesson settings"
      >
        <SettingsForm
          form={s.form}
          onChange={s.updateForm}
          onGenerateLesson={s.onGenerateLesson}
          onGenerateQuiz={s.onGenerateQuiz}
          onReset={s.onResetAll}
          canGenerateLesson={s.canGenerateLesson}
          canGenerateQuiz={s.canGenerateQuiz}
          loadingLesson={s.loadingLesson}
          loadingQuiz={s.loadingQuiz}
          apiBase={s.apiBase}
        />
      </SettingsModal>

      <LessonPanel
        title={s.lessonTitle}
        subject={s.form.subject}
        yearGroup={s.form.year_group}
        lessonText={s.lessonText}
        imageBase64={s.imageBase64}
        imageStatus={s.imageStatus}
        onGenerateQuiz={s.onGenerateQuiz}
        canGenerateQuiz={s.canGenerateQuiz}
        loadingQuiz={s.loadingQuiz}
        isOpen={s.lessonOpen}
        onToggleOpen={s.setLessonOpen}
      />

      <ErrorBanner error={s.error} />

      <QuizPanel
        quiz={s.quiz}
        answers={s.answers}
        setAnswer={s.setAnswer}
        submitted={s.submitted}
        setSubmitted={s.setSubmitted}
        subject={s.form.subject}
        yearGroup={s.form.year_group}
        topic={s.form.topic_idea}
        isOpen={s.quizOpen}
        onToggleOpen={s.setQuizOpen}
      />

      <StatsModal
        open={s.statsOpen}
        onClose={() => s.setStatsOpen(false)}
        loading={s.statsLoading}
        error={s.statsError}
        summary={s.statsSummary}
      />
    </div>
  );
}
