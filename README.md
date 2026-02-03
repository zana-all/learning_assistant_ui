# Learning Assistant – Frontend

## Overview

This repository contains the frontend for the **Learning Assistant** application.

The application allows users to:
- Generate age-appropriate lessons based on subject and year group
- View structured lesson content with supporting visual aids
- Test understanding through an interactive quiz
- Track performance over time and view subject-based learning statistics

The project focuses on clarity, progressive disclosure, and clean separation between UI and orchestration logic.

---

## Features

- Lesson generation with collapsible reading experience
- Automatic visual aid generation based on lesson context
- Interactive quizzes with scoring
- Learning progress and performance statistics
- Clear, user-guided flow from lesson → quiz → results

---

## Tech Stack

- **React** with functional components and hooks
- **Vite** for fast development and build tooling
- **Custom hooks** for orchestration and side effects
- **Fetch-based API client** with centralised error handling
- **Inline styles** for simplicity and portability

---

## Architecture Notes

The frontend follows a simple, production-style structure:

- UI components focus on rendering only
- Application logic and side effects live in custom hooks
- API calls are isolated in a dedicated client layer
- State transitions reflect user learning flow rather than technical concerns


## Running the Project Locally

### 1. Install dependencies
```bash
npm install
```
### 2. Start the development server

```npm run dev```

The app will be available at:
http://localhost:5173

## Backend Dependancy

This frontend is designed to work with the **Learning Assistant Backend** (FastAPI).

Ensure the backend is running locally and accessible at the configured API base URL.

The API base can be configured via:
``` VITE_API_BASE_URL```

## Future Improvements

- Authentication and per-user progress tracking
- Persistent UI preferences
- Enhanced accessibility and keyboard navigation
- Visualisation of learning progress over time

## Purpose

This project was built to demonstrate:
- Clean React architecture
- Thoughtful UX decisions
- Realistic production-style state management
- Integration with an AI-powered backend


